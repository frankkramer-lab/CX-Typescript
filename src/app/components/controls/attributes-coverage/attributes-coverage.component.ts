import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TreeMapData } from '@swimlane/ngx-charts';
import * as d3Array from 'd3-array';
import { EdgeAttributes } from 'src/app/models/edge-attributes';
import { NodeAttributes } from 'src/app/models/node-attributes';

@Component({
  selector: 'app-attributes-coverage',
  templateUrl: './attributes-coverage.component.html',
  styleUrls: ['./attributes-coverage.component.scss'],
})
export class AttributesCoverageComponent implements OnInit, OnChanges {
  treemap: any[];
  treemapPath: any[] = [];
  view: [number, number] = [700, 400];
  colorScheme = 'vivid';

  @Input()
  title: string;

  @Input()
  data: NodeAttributes[] | EdgeAttributes[];

  @Output()
  selectedAttribute = new EventEmitter();

  treemapData: TreeMapData = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.treemapData = this.changeDataFormat();
      this.treemapData = [{ name: this.title, children: this.treemapData }];
      this.treemapProcess();
    }
  }

  changeDataFormat() {
    let formatedArray: TreeMapData = [];
    this.data.forEach((item) => {
      const attribute = formatedArray.find((obj) => obj.name === item.name);
      if (attribute) {
        const attributeValue = attribute.children.find(
          (obj) => obj.name === item.value
        );
        if (attributeValue) {
          attributeValue.size++;
        } else {
          attribute.children.push({ name: item.value, size: 1 });
        }
      } else {
        formatedArray.push({
          name: item.name,
          children: [{ name: item.value, size: 1 }],
        });
      }
    });
    return formatedArray;
  }

  treemapProcess() {
    const children = this.treemapData[0];
    const value = sumChildren(children);
    this.treemap = [children];
    this.treemapPath = [{ name: 'Top', children: [children], value }];

    function sumChildren(node: any): any {
      return (node.value =
        node.size || d3Array.sum(node.children, sumChildren));
    }
  }

  treemapSelect(item: any) {
    let node;
    if (item.children) {
      const idx = this.treemapPath.indexOf(item);
      this.treemapPath.splice(idx + 1);
      this.treemap = this.treemapPath[idx].children;
      return;
    }
    node = this.treemap.find((d) => d.name === item.name);
    if (node.children) {
      this.treemapPath.push(node);
      this.treemap = node.children;
      if (item.name !== this.title) {
        const data = (this.data as any[]).filter(
          (obj: NodeAttributes | EdgeAttributes) => obj.name === item.name
        );
        const attribute = { aspectName: this.title, attributeName: item.name, attributeData: data };
        this.selectedAttribute.next(attribute);
      }
    }
  }
}
