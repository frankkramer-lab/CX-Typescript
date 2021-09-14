import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EdgeAttributes } from 'src/app/models/edge-attributes';
import { Edges } from 'src/app/models/edges';
import { NodeAttributes } from 'src/app/models/node-attributes';
import { Nodes } from 'src/app/models/nodes';

@Component({
  selector: 'app-core-aspect-coverage-by-attributes',
  templateUrl: './core-aspect-coverage-by-attributes.component.html',
  styleUrls: ['./core-aspect-coverage-by-attributes.component.scss'],
})
export class CoreAspectCoverageByAttributesComponent
  implements OnInit, OnChanges
{
  data: any[];
  view: [number, number] = [700, 400];
  colorScheme = 'vivid';

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string;
  yAxisLabel: string;
  timeline: boolean = true;

  @Input()
  aspect: Nodes[] | Edges[];

  @Input()
  aspectAttribute: NodeAttributes[] | EdgeAttributes[];

  @Input()
  title: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.title) {
      this.xAxisLabel = this.title;
      this.yAxisLabel = `${this.title} Attributes`;
    }

    if (this.aspect && this.aspectAttribute) {
      this.data = this.changeDataFormat();
    }
  }

  changeDataFormat() {
    let formatedArray: {
      name: string;
      series: { name: string; value: number }[];
    }[] = [];
    this.aspectAttribute.forEach((item) => {
      // check if the attribute is already registerd in the formated array
      const attribute = formatedArray.find((obj) => obj.name === item.name);
      if (attribute === undefined) {
        let newAttribute = { name: item.name, series: this.getAspectIds() };
        let aspectItem = newAttribute.series.find(
          (obj) => obj.name === item?.property.toString()
        );
        if (aspectItem !== undefined) {
          if (Array.isArray(item.value)) {
            aspectItem.value = item.value.length;
          } else {
            aspectItem.value = 1;
          }
        }
        formatedArray.push(newAttribute);
      } else {
        let aspectItem = attribute.series.find(
          (obj) => obj.name === item?.property.toString()
        );
        if (aspectItem !== undefined) {
          if (Array.isArray(item.value)) {
            aspectItem.value = item.value.length;
          } else {
            aspectItem.value = 1;
          }
        }
      }
    });
    return formatedArray;
  }

  getAspectIds() {
    return this.aspect.map((item) => {
      return { name: item.id.toString(), value: 0 };
    });
  }

  onSelect(event: any) {
    console.log(event);
  }
}
