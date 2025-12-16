import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { BehaviorSubject, distinctUntilChanged, first, tap } from 'rxjs';
import { ThemeClass } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';
import {
  MONACO_REF,
  MonacoEditor,
  MonacoEditorDisposable,
  MonacoEditorOptions,
  MonacoEditorUpdateType,
  MonacoModule,
} from './monaco-editor';
import { MonacoEditorService } from './monaco-editor.service';

declare let monaco: MonacoModule;

@Component({
  selector: 'app-monaco-editor',
  imports: [AsyncPipe, MatButtonModule, MatMenuModule],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss',
  providers: [MonacoEditorService, { provide: MONACO_REF, useValue: window }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonacoEditorComponent implements OnChanges, OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly monacoEditorService = inject(MonacoEditorService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _fileLoading = new BehaviorSubject<boolean>(false);

  private _editor: MonacoEditor;
  private _editorBlur: MonacoEditorDisposable;
  private _editorChange: MonacoEditorDisposable;

  readonly loading$ = this.monacoEditorService.loading$;
  readonly fileLoading$ = this._fileLoading.asObservable();

  readonly container = viewChild<ElementRef<HTMLDivElement>>('container');

  readonly value = model<string>(undefined);
  readonly language = input<string>(undefined);
  readonly updateType = input<MonacoEditorUpdateType>(MonacoEditorUpdateType.Change);
  readonly loadingChange = output<boolean>();

  constructor() {
    this.monacoEditorService.init();
  }

  ngOnChanges({ value }: SimpleChanges): void {
    if (!value.firstChange && value.previousValue !== value.currentValue) {
      this._editor.setValue(value.currentValue);
    }
  }

  ngOnInit(): void {
    this.monacoEditorService.loaded$
      .pipe(
        first(loaded => !!loaded),
        tap(_ => this.initEditor()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._editorChange?.dispose();
    this._editorBlur?.dispose();
    this._editor?.dispose();
  }

  handleFileUpload(files: FileList): void {
    const file = files.item(0);
    const fileReader = new FileReader();
    this._fileLoading.next(true);
    fileReader.onload = event => {
      const value = event.target.result as string;
      this.value.set(value);
      this._editor.setValue(value);
      this._fileLoading.next(false);
    };
    fileReader.onerror = _event => {
      this._fileLoading.next(false);
    };
    fileReader.readAsText(file);
  }

  handleFileDownload(): void {
    const file = new File([this.value()], 'dynamic-form.json', { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  private initEditor(): void {
    const options = this.getEditorOptions();
    this._editor = monaco.editor.create(this.container().nativeElement, options);
    this._editorBlur = this._editor.onDidBlurEditorText(_ => this.updateValue(MonacoEditorUpdateType.Blur));
    this._editorChange = this._editor.onDidChangeModelContent(_ => this.updateValue(MonacoEditorUpdateType.Change));
    this.store
      .select(PreferencesState.themeClass)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        tap(value => this.setTheme(value)),
      )
      .subscribe();
  }

  private getEditorOptions(): MonacoEditorOptions {
    const themeClass = this.store.selectSnapshot(PreferencesState.themeClass);
    return {
      value: this.value(),
      language: this.language(),
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: this.getTheme(themeClass),
    };
  }

  private getTheme(themeClass: ThemeClass): string {
    return themeClass === 'dark' ? 'vs-dark' : 'vs';
  }

  private setTheme(themeClass: ThemeClass): void {
    this._editor.updateOptions({ theme: this.getTheme(themeClass) });
  }

  private updateValue(updateType?: MonacoEditorUpdateType): void {
    if (!updateType || this.updateType() === updateType) {
      this.value.set(this._editor.getValue());
    }
  }
}
