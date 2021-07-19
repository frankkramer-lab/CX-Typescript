import { Component, Input, OnInit } from '@angular/core';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.scss']
})
export class NetworkListComponent implements OnInit {

  @Input()
  networks: Network[] = [];
  constructor(public networkService: NetworkService) { }

  ngOnInit() {
  }
}
