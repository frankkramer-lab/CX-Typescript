import { Component, Input, OnInit } from '@angular/core';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-aspect-properties-ratio',
  templateUrl: './aspect-properties-ratio.component.html',
  styleUrls: ['./aspect-properties-ratio.component.scss'],
})
export class AspectPropertiesRatioComponent implements OnInit {
  colorScheme = 'vivid';
  legendPosition = LegendPosition.Right;
  schemeType = ScaleType.Ordinal;
  barPadding = 8;
  aspectPropertiesRatio: any[] = [];
  numberOfAspectElements = 0;

  @Input()
  aspectName: string;

  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.changeDataFormat(
      this.networkService.networks.filter((obj) => obj.showInDashboard === true)
    );

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
    );
  }

  changeDataFormat(data: Network[]) {
    data.forEach((item) => {
      const aspect = item.aspects.find(
        (obj) => obj.name === this.aspectName.toLowerCase()
      );
      if (aspect !== undefined) {
        this.numberOfAspectElements += aspect.aspectElements.length;
        aspect.aspectElements.forEach((element) => {
          for (const key in element) {
            if (element[key] !== undefined) {
              const propertyName = this.aspectPropertiesRatio.find(
                (obj) => obj.name === key
              );
              if (propertyName === undefined) {
                let newpropertyName = {
                  name: key,
                  extra: { propertyOccurance: 1 },
                };
                this.aspectPropertiesRatio.push(newpropertyName);
              } else {
                propertyName.extra.propertyOccurance =
                  propertyName.extra.propertyOccurance + 1;
              }
            }
          }
        });
      }
    });
    this.aspectPropertiesRatio.forEach((item) => {
      let ratio =
        (item.extra.propertyOccurance / this.numberOfAspectElements) * 100;
      item.value = ratio;
    });
    this.aspectPropertiesRatio = [
      ...this.aspectPropertiesRatio.sort((a, b) => b.value - a.value),
    ];
  }

  removeData(network: Network) {
    const selectedNetworkLength = this.networkService.networks.filter(
      (obj) => obj.showInDashboard === true
    ).length;
    if (selectedNetworkLength === 0) {
      this.aspectPropertiesRatio = [];
      this.numberOfAspectElements = 0;
      return;
    }

    const aspect = network.aspects.find(
      (obj) => obj.name === this.aspectName.toLowerCase()
    );
    if (aspect !== undefined) {
      this.numberOfAspectElements -= aspect.aspectElements.length;
      aspect.aspectElements.forEach((element) => {
        for (const key in element) {
          if (element[key] !== undefined) {
            const propertyName = this.aspectPropertiesRatio.find(
              (obj) => obj.name === key
            );
            if (propertyName !== undefined) {
              propertyName.extra.propertyOccurance =
                propertyName.extra.propertyOccurance - 1;
              if (propertyName.extra.propertyOccurance === 0) {
                this.aspectPropertiesRatio = this.aspectPropertiesRatio.filter(
                  (item) => item.name !== key
                );
              }
            }
          }
        }
      });
    }
    this.aspectPropertiesRatio.forEach((item) => {
      let ratio =
        (item.extra.propertyOccurance / this.numberOfAspectElements) * 100;
      item.value = ratio;
    });
    this.aspectPropertiesRatio = [
      ...this.aspectPropertiesRatio.sort((a, b) => b.value - a.value),
    ];
  }
}
