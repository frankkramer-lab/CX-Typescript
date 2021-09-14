import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EdgeAttributes } from 'src/app/models/edge-attributes';
import { NodeAttributes } from 'src/app/models/node-attributes';

@Component({
  selector: 'app-venn-diagram',
  templateUrl: './venn-diagram.component.html',
  styleUrls: ['./venn-diagram.component.scss'],
})
export class VennDiagramComponent implements OnInit, OnChanges {
  @Input()
  aspectAttribute: {
    aspectName: string;
    attributeName: string;
    attributeData: NodeAttributes[] | EdgeAttributes[];
  }[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
