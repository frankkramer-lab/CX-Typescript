import { Component, OnInit } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
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
    compactType: CompactType.CompactLeftAndUp,
    margin: 4,
    outerMargin: false,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 640,
    maxCols: 4,
    minRows: 1,
    maxRows: 1,
    draggable: {
      enabled: true,
    },
    resizable: {
      enabled: true,
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: false, east: true, south: false, west: true },
    pushResizeItems: false,
    displayGrid: DisplayGrid.None,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false,
  };

  sideBarTabs = { cols: 1, rows: 1, y: 0, x: 0 };
  editor = { cols: 2, rows: 1, y: 0, x: 1 };

  constructor() {}

  ngOnInit() {}
}
