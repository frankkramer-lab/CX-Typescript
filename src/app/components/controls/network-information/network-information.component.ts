import { Component, OnInit } from '@angular/core';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-network-information',
  templateUrl: './network-information.component.html',
  styleUrls: ['./network-information.component.scss'],
})
export class NetworkInformationComponent implements OnInit {
  network: Network;
  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.networkService.selectedNetwork$.subscribe(
      (selectedNetwork: Network) => {
        if (!selectedNetwork) {
          return;
        }
        this.network = selectedNetwork;
      }
    );
  }
}
