import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-tabs',
  templateUrl: './side-bar-tabs.component.html',
  styleUrls: ['./side-bar-tabs.component.scss']
})
export class SideBarTabsComponent implements OnInit {

  errorLength: number = 0;
  constructor() { }

  ngOnInit() {
  }

  getErrorsLength(event: any) {
    console.log(event);
    if(event !== undefined) {
      this.errorLength = event
    }
  }

}
