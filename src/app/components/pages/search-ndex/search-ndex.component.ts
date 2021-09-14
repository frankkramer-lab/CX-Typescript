import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-search-ndex',
  templateUrl: './search-ndex.component.html',
  styleUrls: ['./search-ndex.component.scss'],
})
export class SearchNdexComponent implements OnInit {
  loadingHttp = false;
  loadingAllNetowrks = false;
  elementLimit = 30000;

  constructor(
    public networkService: NetworkService,
    private parseService: ParseService,
    private router: Router
  ) {}

  ngOnInit() {}

  searchFromNdex() {
    if (this.networkService.searchString === null || this.networkService.searchString === undefined) {
      return;
    }

    this.loadingHttp = true;

    this.networkService
      .searchForNetwork()
      .subscribe((data: any) => {
        this.loadingHttp = false;
        this.networkService.setSearchedNetworks(data.networks);
      }, error => {
        this.loadingHttp = false;
        console.log(error);
      });
  }

  downloadAllNetworks() {
    this.networkService.searchedNetworks.forEach((network) => {
      if (this.checkNodesAndEdgesSize(network) || network.percentage !== undefined) {
        return;
      } else {
        this.download(network);
      }
    });
  }

  download(network: any) {
    this.networkService
      .getNetworkInCxFormatWithReportProgress(network.externalId)
      .subscribe((event: any) => {
        // progress
        if (event.type === HttpEventType.DownloadProgress) {
          network.percentage = (100 / network.cxFileSize) * event.loaded;
          if (network.percentage < 30) {
            network.progressbarType = 'danger';
          } else if (network.percentage < 70) {
            network.progressbarType = 'warning';
          } else {
            network.progressbarType = 'success';
          }
          if (network.cxFileSize === event.loaded) {
            let parsedNetwork = this.parseService.parseCXToObjects(
              JSON.parse(event.partialText)
            );
            parsedNetwork.networkInformation!.uuid = network.externalId;
            parsedNetwork.editorOption!.networkTxt = event.partialText;
            this.networkService.addNetwork(parsedNetwork);
          }
        }

        // finished
        if (event.type === HttpEventType.Response) {
          network.done = true;
        }
      }, error => {

      });
  }

  showNetworkInEditor(networkSummary: any) {
    this.showNetworkDetails(networkSummary, 'upload');
  }

  showNetworkInformation(networkSummary: any) {
    this.showNetworkDetails(networkSummary, 'info');
  }

  showNetworkStatistics(networkSummary: any) {
    this.showNetworkDetails(networkSummary, 'statistics');
  }

  showNetworkDetails(
    networkSummary: any,
    tab: 'upload' | 'info' | 'statistics'
  ) {
    const network =
      this.networkService.getNetworkByUUID(networkSummary.externalId) ||
      this.networkService.getNetworkByName(networkSummary.name);
    this.networkService.setSelectedNetwork$(network);
    this.router.navigate(['/editor'], { queryParams: { tab: tab } });
  }

  checkNodesAndEdgesSize(networkSummary: any) {
    return (
      (networkSummary.nodeCount &&
        networkSummary.nodeCount > this.elementLimit) ||
      (networkSummary.edgeCount && networkSummary.edgeCount > this.elementLimit)
    );
  }
}
