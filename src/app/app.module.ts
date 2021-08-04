import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { GridsterModule } from 'angular-gridster2';

import { HomeComponent } from './components/pages/home/home.component';
import { DocumentationComponent } from './components/pages/documentation/documentation.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { EditComponent } from './components/pages/edit/edit.component';

import { EditorComponent } from './components/controls/editor/editor.component';
import { SideBarManageComponent } from './components/controls/side-bar-manage/side-bar-manage.component';
import { NetworkListComponent } from './components/controls/network-list/network-list.component';
import { NavbarComponent } from './components/controls/navbar/navbar.component';
import { SideBarTabsComponent } from './components/controls/side-bar-tabs/side-bar-tabs.component';
import { NetworkInformationComponent } from './components/controls/network-information/network-information.component';
import { ErrorListComponent } from './components/controls/error-list/error-list.component';
import { NetworkStatisticsComponent } from './components/controls/network-statistics/network-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SideBarManageComponent,
    SideBarTabsComponent,
    NetworkListComponent,
    NavbarComponent,
    ErrorListComponent,
    NetworkInformationComponent,
    NetworkStatisticsComponent,

    HomeComponent,
    DocumentationComponent,
    StatisticsComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MonacoEditorModule,
    GridsterModule,

    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
