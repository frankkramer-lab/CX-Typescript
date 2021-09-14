import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';

import { Validator } from 'cx-typescript';
import { ErrorsService } from 'src/app/services/errors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    glyphMargin: true,
    smoothScrolling: true,
  };
  code: string;
  loadingEditor = true;
  readingFile = false;
  validatingFile = false;
  selectedNetwork!: Network;
  decorations: any = [];
  subscription = new Subscription();

  @ViewChildren('editor')
  public monacoQueryList: QueryList<MonacoEditorComponent>;

  private monacoComponent: MonacoEditorComponent;

  // @ViewChild('editor')
  // monacoComponent: MonacoEditorComponent;

  constructor(
    public monacoLoaderService: MonacoEditorLoaderService,
    public networkService: NetworkService,
    private errorService: ErrorsService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.subscribeToEditorLoadEvent();
  }

  ngAfterViewInit(): void {
    const model = this.monacoQueryList.first;
    if (model) {
      this.monacoComponent = this.monacoQueryList.first;
      this.subscribeToSelectedNetworkChange();
      this.subscribeToErrorLocationClick();
    } else {
      this.monacoQueryList.changes.subscribe(
        (comps: QueryList<MonacoEditorComponent>) => {
          this.monacoComponent = comps.first;
          this.subscribeToSelectedNetworkChange();
          this.subscribeToErrorLocationClick();
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    monaco.editor.getModels().forEach((model) => model.dispose());
    this.networkService.networks.forEach((item) => {
      item.editorOption.editorModel = undefined;
      item.editorOption.editorState = undefined;
    });
  }

  private subscribeToSelectedNetworkChange() {
    this.subscription.add(
      this.networkService.selectedNetwork$.subscribe(
        (selectedNetwork: Network) => {
          if (!selectedNetwork) {
            return;
          }
          this.manageEditorState(selectedNetwork);

          this.monacoComponent.editor.onDidChangeModel((e) => {
            this.readingFile = false;
          });

          this.monacoComponent.editor.onDidChangeModelContent((e) => {
            this.validateEditor();
          });
          // this.monacoComponent.editor.onDidChangeCursorSelection((e) => {
          //   var t = this.monacoComponent.model.getValueInRange(e.selection);
          // });
        }
      )
    );
  }

  private subscribeToEditorLoadEvent() {
    this.subscription.add(
      this.monacoLoaderService.isMonacoLoaded$.subscribe(
        (isLoaded: boolean) => {
          this.loadingEditor = !isLoaded;
        }
      )
    );
  }

  private subscribeToErrorLocationClick() {
    this.subscription.add(
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
      })
    );
  }

  private manageEditorState(selectedNetwork: Network) {
    if (!this.selectedNetwork) {
      // if this is the first time the user is pressing on a network
      this.selectedNetwork = selectedNetwork;
      this.createMonacoModel(selectedNetwork);
    } else {
      this.selectedNetwork.editorOption!.editorModel =
        this.monacoComponent.editor.getModel();
      this.selectedNetwork.editorOption!.editorState =
        this.monacoComponent.editor.saveViewState();

      if (!selectedNetwork.editorOption?.editorModel) {
        this.createMonacoModel(selectedNetwork);
      } else {
        this.readingFile = true;
        this.validatingFile = true;
        setTimeout(() => {
          this.monacoComponent.editor.setModel(
            selectedNetwork.editorOption!.editorModel
          );
          this.readingFile = false;
          this.validateEditor();
        });
      }

      if (selectedNetwork.editorOption?.editorState) {
        this.monacoComponent.editor.restoreViewState(
          selectedNetwork.editorOption?.editorState
        );
      }
      this.selectedNetwork = selectedNetwork;

      this.monacoComponent.editor.focus();
    }
  }

  private createMonacoModel(selectedNetwork: Network) {
    this.readingFile = true;
    this.validatingFile = true;
    let model = window.monaco.editor.createModel(
      selectedNetwork.editorOption.networkTxt,
      'json'
    );
    selectedNetwork.editorOption!.editorModel = model;
    setTimeout(() => {
      this.monacoComponent.editor.setModel(model);
      this.validateEditor();
    });
  }

  private validateEditor() {
    this.validatingFile = true;
    this.validateCxData().then((errors: any) => {
      this.validatingFile = false;
      this.setErrorDecoration(errors);
    });
  }

  private validateCxData() {
    return new Promise((resolve, reject) => {
      this.zone.runOutsideAngular(() => {
        const errors = Validator.validateCxData(
          this.monacoComponent.editor.getModel()?.getValue()
        );
        resolve(errors);
      });
    });
  }

  private setErrorDecoration(errors: any) {
    let newDecorations: any = [];
    let validJsonFormat = true;
    console.log(errors);
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
}
