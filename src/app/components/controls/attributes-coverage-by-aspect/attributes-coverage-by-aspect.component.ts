import { Component, Input, OnInit } from '@angular/core';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-attributes-coverage-by-aspect',
  templateUrl: './attributes-coverage-by-aspect.component.html',
  styleUrls: ['./attributes-coverage-by-aspect.component.scss'],
})
export class AttributesCoverageByAspectComponent implements OnInit {
  colorScheme = 'vivid';
  legendPosition = LegendPosition.Right;
  schemeType = ScaleType.Ordinal;
  barPadding = 8;
  aspectAttributeRatio: any[] = [];
  numberOfAspectElements = 0;

  @Input()
  aspectName: string;

  @Input()
  aspectAttributeName: string;

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
      const aspectLength = item.aspects.find(
        (obj) => obj.name === this.aspectName.toLowerCase()
      ).aspectElements.length;
      this.numberOfAspectElements += aspectLength;

      const aspect = item.aspects.find(
        (obj) => obj.name === this.aspectAttributeName
      );
      if (aspect !== undefined) {
        aspect.aspectElements.forEach((element) => {
          if (element['n'] !== undefined) {
            const propertyName = this.aspectAttributeRatio.find(
              (obj) => obj.name === element['n']
            );
            if (propertyName === undefined) {
              let newpropertyName = {
                name: element['n'],
                extra: { propertyOccurance: 1 },
              };
              this.aspectAttributeRatio.push(newpropertyName);
            } else {
              propertyName.extra.propertyOccurance =
                propertyName.extra.propertyOccurance + 1;
            }
          }
        });
      }
    });
    this.aspectAttributeRatio.forEach((item) => {
      let ratio =
        (item.extra.propertyOccurance / this.numberOfAspectElements) * 100;
      item.value = ratio;
    });
    this.aspectAttributeRatio = [
      ...this.aspectAttributeRatio.sort((a, b) => b.value - a.value),
    ].filter((obj) => obj.value > 10);
  }

  removeData(network: Network) {
    const selectedNetworkLength = this.networkService.networks.filter(
      (obj) => obj.showInDashboard === true
    ).length;
    if (selectedNetworkLength === 0) {
      this.aspectAttributeRatio = [];
      this.numberOfAspectElements = 0;
      return;
    }

    const aspectLength = network.aspects.find(
      (obj) => obj.name === this.aspectName.toLowerCase()
    ).aspectElements.length;

    this.numberOfAspectElements -= aspectLength;

    const aspect = network.aspects.find(
      (obj) => obj.name === this.aspectName.toLowerCase()
    );
    if (aspect !== undefined) {
      aspect.aspectElements.forEach((element) => {
        if (element['n'] !== undefined) {
          const propertyName = this.aspectAttributeRatio.find(
            (obj) => obj.name === element['n']
          );
          if (propertyName !== undefined) {
            propertyName.extra.propertyOccurance =
              propertyName.extra.propertyOccurance - 1;
            if (propertyName.extra.propertyOccurance === 0) {
              this.aspectAttributeRatio = this.aspectAttributeRatio.filter(
                (item) => item.name !== element['n']
              );
            }
          }
        }
      });
    }
    this.aspectAttributeRatio.forEach((item) => {
      let ratio =
        (item.extra.propertyOccurance / this.numberOfAspectElements) * 100;
      item.value = ratio;
    });
    this.aspectAttributeRatio = [
      ...this.aspectAttributeRatio.sort((a, b) => b.value - a.value),
    ].filter((obj) => obj.value > 10);
  }
}
