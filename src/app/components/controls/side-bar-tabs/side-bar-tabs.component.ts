import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-side-bar-tabs',
  templateUrl: './side-bar-tabs.component.html',
  styleUrls: ['./side-bar-tabs.component.scss'],
})
export class SideBarTabsComponent implements OnInit {
  errorLength: number = 0;

  @ViewChild('tabset', { static: true })
  tabsets: TabsetComponent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const selectedTab = params.tab;
      if (selectedTab === 'upload') {
        this.tabsets.tabs[0].active = true;
      } else if (selectedTab === 'info') {
        this.tabsets.tabs[1].active = true;
      } else if (selectedTab === 'statistics') {
        this.tabsets.tabs[3].active = true;
      }
    });
  }

  getErrorsLength(event: any) {
    if (event !== undefined) {
      this.errorLength = event;
    }
  }
}
