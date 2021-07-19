import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { TreeviewModule } from 'ngx-treeview';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/controls/editor/editor.component';
import { SideBarManageComponent } from './components/controls/side-bar-manage/side-bar-manage.component';
import { TreeViewComponent } from './components/controls/tree-view/tree-view.component';
import { MainComponent } from './components/main/main.component';
import { NetworkListComponent } from './components/controls/network-list/network-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    TreeViewComponent,
    SideBarManageComponent,
    NetworkListComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MonacoEditorModule,
    TreeviewModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
