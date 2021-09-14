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
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { GridsterModule } from 'angular-gridster2';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HomeComponent } from './components/pages/home/home.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { EditComponent } from './components/pages/edit/edit.component';

import { EditorComponent } from './components/controls/editor/editor.component';
import { SideBarManageComponent } from './components/controls/side-bar-manage/side-bar-manage.component';
import { NavbarComponent } from './components/controls/navbar/navbar.component';
import { SideBarTabsComponent } from './components/controls/side-bar-tabs/side-bar-tabs.component';
import { NetworkInformationComponent } from './components/controls/network-information/network-information.component';
import { ErrorListComponent } from './components/controls/error-list/error-list.component';
import { NetworkStatisticsComponent } from './components/controls/network-statistics/network-statistics.component';
import { AttributesCoverageComponent } from './components/controls/attributes-coverage/attributes-coverage.component';
import { CoreAspectCoverageByAttributesComponent } from './components/controls/core-aspect-coverage-by-attributes/core-aspect-coverage-by-attributes.component';
import { VennDiagramComponent } from './components/controls/venn-diagram/venn-diagram.component';
import { SearchNdexComponent } from './components/pages/search-ndex/search-ndex.component';
import { NetworkListEditorComponent } from './components/controls/network-list/network-list-editor/network-list-editor.component';
import { NetworkListStatisticsComponent } from './components/controls/network-list/network-list-statistics/network-list-statistics.component';
import { AspectRatioComponent } from './components/controls/aspect-ratio/aspect-ratio.component';
import { StatisticsDashboardComponent } from './components/controls/statistics-dashboard/statistics-dashboard.component';
import { AspectPropertiesRatioComponent } from './components/controls/aspect-properties-ratio/aspect-properties-ratio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AttributesCoverageByAspectComponent } from './components/controls/attributes-coverage-by-aspect/attributes-coverage-by-aspect.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SideBarManageComponent,
    SideBarTabsComponent,
    NavbarComponent,
    ErrorListComponent,
    NetworkInformationComponent,
    NetworkStatisticsComponent,
    AttributesCoverageComponent,
    CoreAspectCoverageByAttributesComponent,
    VennDiagramComponent,
    NetworkListEditorComponent,
    NetworkListStatisticsComponent,
    StatisticsDashboardComponent,
    AspectRatioComponent,
    AspectPropertiesRatioComponent,
    AttributesCoverageByAspectComponent,

    HomeComponent,
    StatisticsComponent,
    SearchNdexComponent,
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
    NgxChartsModule,

    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
