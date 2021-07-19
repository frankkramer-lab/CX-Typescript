import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild(MonacoEditorComponent)
  monacoComponent!: MonacoEditorComponent;
  editorOptions = { theme: 'vs-dark', language: 'json', glyphMargin: true };
  code: string = '';
  loadingEditor = true;

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {}

  ngOnInit() {
    // this.monacoLoaderService.isMonacoLoaded$
    //   .pipe(
    //     filter((isLoaded) => !!isLoaded),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //   });
  }

  onInit(event: any) {
    this.loadingEditor = false;
  }
}
