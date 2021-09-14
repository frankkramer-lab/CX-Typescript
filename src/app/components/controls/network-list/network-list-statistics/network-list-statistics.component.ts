import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-network-list-statistics',
  templateUrl: './network-list-statistics.component.html',
  styleUrls: ['./network-list-statistics.component.scss'],
})
export class NetworkListStatisticsComponent implements OnInit {
  constructor(public networkService: NetworkService, private router: Router) {}

  ngOnInit() {}

  showNetworkInEditor(network: Network) {
    this.showNetworkDetails(network, 'upload');
  }

  showNetworkInformation(network: Network) {
    this.showNetworkDetails(network, 'info');
  }

  showNetworkStatistics(network: Network) {
    this.showNetworkDetails(network, 'statistics');
  }

  showNetworkStatisticsInDashboard(network: Network) {
    network.showInDashboard = !network.showInDashboard;
    this.networkService.setNetowrkInDashboard$(network);
  }

  selectAllNetwork() {
    this.networkService.networks.map((item) => {
      if (item.showInDashboard === false) {
        item.showInDashboard = true;
        this.networkService.setNetowrkInDashboard$(item);
      }
    });
  }

  removeAllSelection() {
    this.networkService.networks.map((item) => {
      if (item.showInDashboard === true) {
        item.showInDashboard = false;
        this.networkService.setNetowrkInDashboard$(item);
      }
    });
  }

  showNetworkDetails(network: Network, tab: 'upload' | 'info' | 'statistics') {
    this.networkService.setSelectedNetwork$(network);
    this.router.navigate(['/editor'], { queryParams: { tab: tab } });
  }

  getSelectedNetworksLength() {
    return this.networkService.networks.filter(
      (item) => item.showInDashboard === true
    ).length;
  }
}
