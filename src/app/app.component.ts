import { Component } from '@angular/core';
import { Network } from './models/network';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CX-Typescript';

  constructor(private networkService: NetworkService) {
    this.networkService.getNetwork()
    .subscribe((data: Network) => {
      console.log(data);
    });
  }
}
