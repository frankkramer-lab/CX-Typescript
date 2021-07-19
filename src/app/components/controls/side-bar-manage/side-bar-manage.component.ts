import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-side-bar-manage',
  templateUrl: './side-bar-manage.component.html',
  styleUrls: ['./side-bar-manage.component.scss'],
})
export class SideBarManageComponent implements OnInit {
  ndexNetworkUUID = '';
  httpErrorMessage = '';
  invalidExtension = '';
  networkAlreadyExist = '';

  loadingHttp = false;
  loadingFile = false;

  elementLimit = 30000;
  sizeLimit = 20; // MB
  currentFileSize!: number;

  nodeCount!: number;
  edgeCount!: number;

  showFileElementCountTooBig = false;
  showFileSizeTooLargeAlert = false;
  showFileNotValidAlert = false;
  showFileSizeOkAlert = false;
  showHttpErrorAlert = false;
  showNetworkAlreadyExistAlert = false;

  private readonly megaFactor = 1000 * 1000; // MB

  private readonly duration = 8 * 1000; // seconds

  constructor(
    private networkService: NetworkService,
    private parseService: ParseService
  ) {}

  ngOnInit() {}

  importFromNdex() {
    if (!this.ndexNetworkUUID) {
      this.loadingHttp = false;
      return;
    }
    this.loadingHttp = true;
    let networkAlreadyExist = this.networkService.getNetworkByUUID(this.ndexNetworkUUID);
    if (networkAlreadyExist !== undefined) {
      this.showNetworkAlreadyExistError(
        `Network with name ${networkAlreadyExist.networkInformation?.name} and UUID ${this.ndexNetworkUUID} already exist`
      );
      this.loadingHttp = false;
      return;
    }

    this.networkService.getNetworkSummary(this.ndexNetworkUUID).subscribe(
      (networkSummary: any) => {
        if (this.checkNodesAndEdgesSize(networkSummary)) {
          this.showInvalidNodesAndEdgesSizeError(networkSummary);
          this.loadingHttp = false;
          return;
        }

        this.networkService
          .getNetworkInCxFormat(this.ndexNetworkUUID)
          .subscribe(
            (network: any) => {
              const dataSize = new TextEncoder().encode(JSON.stringify(network)).length;
              this.currentFileSize = Number((dataSize / this.megaFactor).toFixed(2));
              if (this.currentFileSize > this.sizeLimit) {
                this.showFileSizeIsToBigError();
                return;
              }
              this.showFileSizeIsOk();
              let parsedNetwork = this.parseService.parseCXToObjects(network);
              parsedNetwork.networkInformation!.uuid = this.ndexNetworkUUID;
              this.networkService.addNetwork(parsedNetwork);
            },
            (error) => {
              this.showHttpErrorMessage(error.error.message);
            }
          );
      },
      (error) => {
        this.showFileElementCountTooBig = false;
        this.showHttpErrorMessage(error.error.message);
        this.loadingHttp = false;
      }
    );
  }

  private showFileSizeIsOk() {
    this.showFileSizeOkAlert = true;
    this.loadingHttp = false;

    setTimeout(() => {
      this.showFileSizeOkAlert = false;
    }, this.duration);
  }

  importLocalFile() {}

  setAndValidateFile(event: any) {}

  private showFileSizeIsToBigError() {
    this.showFileSizeTooLargeAlert = true;
    this.loadingHttp = false;

    setTimeout(() => {
      this.showFileSizeTooLargeAlert = false;
    }, this.duration);
  }

  private showHttpErrorMessage(errorMessage: string) {
    this.showHttpErrorAlert = true;
    this.httpErrorMessage = errorMessage;
    setTimeout(() => {
      this.showHttpErrorAlert = false;
    }, this.duration);
  }

  private showInvalidNodesAndEdgesSizeError(networkSummary: any) {
    this.nodeCount = networkSummary.nodeCount;
    this.edgeCount = networkSummary.edgeCount;
    this.showFileElementCountTooBig = true;

    setTimeout(() => {
      this.showFileElementCountTooBig = false;
    }, this.duration);
  }

  private showNetworkAlreadyExistError(errorMessage: string) {
    this.showNetworkAlreadyExistAlert = true;
    this.networkAlreadyExist = errorMessage;
    setTimeout(() => {
      this.showNetworkAlreadyExistAlert = false;
    }, this.duration);
  }

  private checkNodesAndEdgesSize(networkSummary: any) {
    return (
      (networkSummary.nodeCount &&
        networkSummary.nodeCount > this.elementLimit) ||
      (networkSummary.edgeCount && networkSummary.edgeCount > this.elementLimit)
    );
  }

  get networks() {
    return this.networkService.networks;
  }
}
