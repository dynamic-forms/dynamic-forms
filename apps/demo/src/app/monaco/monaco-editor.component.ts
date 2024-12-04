import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { BehaviorSubject, distinctUntilChanged, first, map, tap } from 'rxjs';
import { ThemeMode } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';
import { MonacoEditor, MonacoEditorDisposable, MonacoEditorOptions, MonacoEditorUpdateType, MonacoModule } from './monaco-editor';
import { MonacoEditorService } from './monaco-editor.service';

declare let monaco: MonacoModule;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss',
  imports: [AsyncPipe, MatButtonModule, MatMenuModule],
  providers: [MonacoEditorService],
})
export class MonacoEditorComponent implements OnChanges, OnInit, OnDestroy {
  private readonly _fileLoading = new BehaviorSubject<boolean>(false);

  private _editor: MonacoEditor;
  private _editorBlur: MonacoEditorDisposable;
  private _editorChange: MonacoEditorDisposable;

  readonly loading$ = this.monacoEditorService.loading$;
  readonly fileLoading$ = this._fileLoading.asObservable();

  @ViewChild('container', { static: true }) container: ElementRef<HTMLDivElement>;

  @Input() value: string;
  @Input() language: string;
  @Input() updateType: MonacoEditorUpdateType = MonacoEditorUpdateType.Change;
  @Output() readonly valueChange = new EventEmitter<string>();
  @Output() readonly loadingChange = new EventEmitter<boolean>();

  constructor(
    private store: Store,
    private monacoEditorService: MonacoEditorService,
    private destroyRef: DestroyRef,
  ) {
    this.monacoEditorService.load();
  }

  ngOnChanges({ value }: SimpleChanges): void {
    if (!value.firstChange && value.previousValue !== value.currentValue && value.currentValue !== this.value) {
      this._editor.setValue(this.value);
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
      this.value = event.target.result as string;
      this._editor.setValue(this.value);
      this._fileLoading.next(false);
      this.valueChange.emit(this.value);
    };
    fileReader.onerror = _event => {
      this._fileLoading.next(false);
    };
    fileReader.readAsText(file);
  }

  handleFileDownload(): void {
    const file = new File([this.value], 'dynamic-form.json', { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  private initEditor(): void {
    const options = this.getEditorOptions();
    this._editor = monaco.editor.create(this.container.nativeElement, options);
    this._editorBlur = this._editor.onDidBlurEditorText(_ => this.updateValue(MonacoEditorUpdateType.Blur));
    this._editorChange = this._editor.onDidChangeModelContent(_ => this.updateValue(MonacoEditorUpdateType.Change));
    this.store
      .select(PreferencesState.theme)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(theme => theme?.mode),
        distinctUntilChanged(),
        tap(mode => this.setTheme(mode)),
      )
      .subscribe();
  }

  private getEditorOptions(): MonacoEditorOptions {
    const themeMode = this.store.selectSnapshot(PreferencesState.theme)?.mode;
    return {
      value: this.value,
      language: this.language,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: this.getTheme(themeMode),
    };
  }

  private getTheme(mode: ThemeMode): string {
    return mode === 'dark-mode' ? 'vs-dark' : 'vs';
  }

  private setTheme(mode: ThemeMode): void {
    this._editor.updateOptions({ theme: this.getTheme(mode) });
  }

  private updateValue(updateType?: MonacoEditorUpdateType): void {
    if (!updateType || this.updateType === updateType) {
      this.value = this._editor.getValue();
      this.valueChange.emit(this.value);
    }
  }
}
