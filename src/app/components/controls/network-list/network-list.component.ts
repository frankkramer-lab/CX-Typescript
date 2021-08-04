import { Component, Input, OnInit } from '@angular/core';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.scss'],
})
export class NetworkListComponent implements OnInit {
  @Input()
  networks!: Network[];
  constructor(public networkService: NetworkService) {}

  ngOnInit() {}

  setSelectedNetwork(network: Network) {
    const networkIdentifier = network.networkInformation?.uuid || network.networkInformation?.name;
    if(networkIdentifier !== undefined) {
      this.networkService.setSelectedNetwork$(network);
    }
  }

  downloadNetwork(network: Network) {
    let netowrkFile: any;
    if (network.editorOption?.editorModel !== undefined) {
      netowrkFile = network.editorOption?.editorModel.getValue();
    } else {
      netowrkFile = network.editorOption?.networkTxt;
    }
    const blob = new Blob([netowrkFile], {
      type: 'application/octet-stream',
    });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute(
      'download',
      (network.networkInformation?.name ||
        'network_' + network.networkInformation?.uuid) + '.cx'
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
