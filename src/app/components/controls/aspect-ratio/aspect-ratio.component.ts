import { Component, OnDestroy, OnInit } from '@angular/core';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-aspect-ratio',
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.scss'],
})
export class AspectRatioComponent implements OnInit, OnDestroy {
  colorScheme = 'vivid';
  legendPosition = LegendPosition.Right;
  schemeType = ScaleType.Ordinal;
  barPadding = 8;
  aspectRatio: any[] = [];
  subscription = new Subscription();
  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.changeDataFormat(
      this.networkService.networks.filter((obj) => obj.showInDashboard === true)
    );

    this.subscription.add(
      this.networkService.netowrkInDashboard$.subscribe(
        (selectedNetwork: Network) => {
          if (!selectedNetwork) {
            return;
          }
          if (selectedNetwork.showInDashboard) {
            this.changeDataFormat([selectedNetwork]);
          } else {
            this.removeData(selectedNetwork);
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeDataFormat(data: Network[]) {
    const selectedNetworkLength = this.networkService.networks.filter(
      (obj) => obj.showInDashboard === true
    ).length;
    data.forEach((item) => {
      item.aspects.forEach((aspectInfo) => {
        const aspectName = this.aspectRatio.find(
          (obj) => obj.name === aspectInfo.name
        );
        if (aspectName === undefined) {
          let ratio = (1 / selectedNetworkLength) * 100;
          let newAspectName = {
            name: aspectInfo.name,
            value: ratio,
            extra: { aspectOccurance: 1 },
          };
          this.aspectRatio.push(newAspectName);
        } else {
          aspectName.extra.aspectOccurance =
            aspectName.extra.aspectOccurance + 1;
          let ratio =
            (aspectName.extra.aspectOccurance / selectedNetworkLength) * 100;
          aspectName.value = ratio;
        }
      });
    });
    this.aspectRatio.forEach((item) => {
      let ratio = (item.extra.aspectOccurance / selectedNetworkLength) * 100;
      item.value = ratio;
    });
    this.aspectRatio = [...this.aspectRatio.sort((a, b) => b.value - a.value)];
  }

  removeData(network: Network) {
    const selectedNetworkLength = this.networkService.networks.filter(
      (obj) => obj.showInDashboard === true
    ).length;
    if (selectedNetworkLength === 0) {
      this.aspectRatio = [];
      return;
    }
    this.aspectRatio.forEach((aspectInfo) => {
      const aspectName = network.aspects.find(
        (obj) => obj.name === aspectInfo.name
      );
      if (aspectName !== undefined) {
        aspectInfo.extra.aspectOccurance = aspectInfo.extra.aspectOccurance - 1;
      }

      if (aspectInfo.extra.aspectOccurance === 0) {
        this.aspectRatio = this.aspectRatio.filter(
          (item) => item.name !== aspectInfo.name
        );
      } else {
        let ratio =
          (aspectInfo.extra.aspectOccurance / selectedNetworkLength) * 100;
        aspectInfo.value = ratio;
      }
    });
    this.aspectRatio = [...this.aspectRatio.sort((a, b) => b.value - a.value)];
  }
}
