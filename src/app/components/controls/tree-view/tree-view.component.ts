import { Component, OnInit } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview/lib/models/treeview-item';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnInit {
  config: any = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
  };

  items: TreeviewItem[] = [];

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.items = this.errorService.getBooks();
  }

  onSelectedChange(event: any) {}

  onFilterChange(event: any) {}
}
