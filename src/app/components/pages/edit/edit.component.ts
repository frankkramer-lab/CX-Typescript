import { Component, OnInit } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
} from 'angular-gridster2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  options: GridsterConfig = {
    gridType: GridType.Fit,
    compactType: CompactType.None,
    margin: 4,
    outerMargin: false,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    minCols: 1,
    maxCols: 100,
    minRows: 1,
    maxRows: 1,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 50,
    draggable: {
      enabled: false,
    },
    resizable: {
      enabled: true,
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: true,
    displayGrid: DisplayGrid.OnDragAndResize,
    // itemResizeCallback: this.itemResize.bind(this),
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false,
  };

  sideBarTabs = {
    cols: 2,
    rows: 1,
    y: 0,
    x: 0,
    resizeEnabled: true,
    compactEnabled: false,
  };

  editor = {
    cols: 5,
    rows: 1,
    y: 0,
    x: 1,
    resizeEnabled: true,
    compactEnabled: true,
  };

  constructor() {}

  ngOnInit() {}

  itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {}
}
