import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

import { Validator } from 'cx-typescript';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild(MonacoEditorComponent)
  monacoComponent!: MonacoEditorComponent;
  editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    glyphMargin: true,
    smoothScrolling: true,
  };
  code: string = '';
  loadingEditor = true;
  selectedNetwork!: Network;
  decorations: any = [];

  constructor(
    public monacoLoaderService: MonacoEditorLoaderService,
    public networkService: NetworkService,
    private errorService: ErrorsService
  ) {}

  ngOnInit() {
    this.subscribeToSelectedNetowrkChange();
    this.subscribeToEditorLoadEvent();
    this.subscribeToErrorLocationClick();
  }

  private subscribeToSelectedNetowrkChange() {
    this.networkService.selectedNetwork$.subscribe(
      (selectedNetwork: Network) => {
        if (!selectedNetwork) {
          return;
        }
        this.manageEditorState(selectedNetwork);
        this.monacoComponent.editor.getModel()?.onDidChangeContent((e) => {
          this.validateEditor();
        });

        this.monacoComponent.editor.onDidChangeCursorSelection((e) => {
          var t = this.monacoComponent.model.getValueInRange(e.selection);
        });
      }
    );
  }

  private subscribeToEditorLoadEvent() {
    this.monacoLoaderService.isMonacoLoaded$.subscribe((isLoaded: boolean) => {
      this.loadingEditor = !isLoaded;
    });
  }

  private subscribeToErrorLocationClick() {
    this.errorService.errorLocation$.subscribe((location: any) => {
      this.monacoComponent.editor.revealRangeInCenterIfOutsideViewport(
        {
          startLineNumber: location.value.line,
          startColumn: location.value.column,
          endLineNumber: location.valueEnd.line,
          endColumn: location.valueEnd.column,
        },
        window.monaco.editor.ScrollType.Smooth
      );

      let startLine = location.value.line;
      let startColumn = location.value.column;
      if (location.key !== undefined) {
        startLine = location.key.line;
        startColumn = location.key.column;
      }
      this.monacoComponent.editor.setSelection({
        selectionStartLineNumber: startLine,
        selectionStartColumn: startColumn + 1,
        positionLineNumber: location.valueEnd.line,
        positionColumn: location.valueEnd.column + 1,
      });
    });
  }

  private manageEditorState(selectedNetwork: Network) {
    if (!this.selectedNetwork) {
      // if this is the first time the user is pressing on a network
      this.selectedNetwork = selectedNetwork;
      this.createMonacoModel(selectedNetwork);
      this.validateEditor();
    } else {
      this.selectedNetwork.editorOption!.editorModel =
        this.monacoComponent.editor.getModel();
      this.selectedNetwork.editorOption!.editorState =
        this.monacoComponent.editor.saveViewState();

      if (!selectedNetwork.editorOption?.editorModel) {
        this.createMonacoModel(selectedNetwork);
      } else {
        this.monacoComponent.editor.setModel(
          selectedNetwork.editorOption!.editorModel
        );
      }

      if (selectedNetwork.editorOption?.editorState) {
        this.monacoComponent.editor.restoreViewState(
          selectedNetwork.editorOption?.editorState
        );
      }
      this.selectedNetwork = selectedNetwork;

      this.validateEditor();
      this.monacoComponent.editor.focus();
    }
  }

  private createMonacoModel(selectedNetwork: Network) {
    let model = window.monaco.editor.createModel(
      selectedNetwork.editorOption!.networkTxt,
      'json'
    );
    selectedNetwork.editorOption!.editorModel = model;
    this.monacoComponent.editor.setModel(model);
  }

  private validateEditor() {
    this.validateCxData().then((errors: any) => {
      this.setErrorDecoration(errors);
    });
  }

  private setErrorDecoration(errors: any) {
    let newDecorations: any = [];
    let validJsonFormat = true;
    errors.map((error: any) => {
      if (error.aspectName === 'invalid_json_format') {
        validJsonFormat = false;
      }
      return error.loc?.map((errorLocation: any) => {
        newDecorations.push({
          range: new window.monaco.Range(
            errorLocation.value.line,
            1,
            errorLocation.value.line,
            1
          ),
          options: {
            isWholeLine: true,
            glyphMarginClassName: 'myGlyphMarginClass',
            glyphMarginHoverMessage: { value: error.message },
          },
        });
      });
    });

    this.selectedNetwork.errors = errors;
    this.errorService.setNetworkErrors$(errors);
    if (validJsonFormat) {
      this.decorations = this.monacoComponent.editor.deltaDecorations(
        this.decorations,
        newDecorations
      );
    }
  }

  private validateCxData() {
    return new Promise((resolve, reject) => {
      const errors = Validator.validateCxData(
        this.monacoComponent.editor.getModel()?.getValue()
      );
      resolve(errors);
    });
  }
}
