import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { filter, Observable, take, tap } from 'rxjs';
import { MonacoModule, MonacoEditor, MonacoEditorOptions } from './monaco-editor';
import { MonacoEditorService } from './monaco-editor.service';

declare let monaco: MonacoModule;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: [ './monaco-editor.component.scss']
})
export class MonacoEditorComponent implements OnChanges, AfterViewInit {
  private _editor: MonacoEditor;

  readonly isLoading$: Observable<boolean>;

  @ViewChild('container', { static: true }) container: ElementRef;

  @Input() language: string;
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private monacoEditorService: MonacoEditorService) {
    this.isLoading$ = this.monacoEditorService.isLoading.asObservable();
    this.monacoEditorService.load();
  }

  ngOnChanges({ value }: SimpleChanges): void {
    if (value && !value.firstChange && value.previousValue !== value.currentValue) {
      this._editor.setValue(this.value);
    }
  }

  ngAfterViewInit(): void {
    this.monacoEditorService.isLoaded.pipe(
      filter(isLoaded => !!isLoaded),
      take(1),
      tap(_ => this.initEditor())
    ).subscribe();
  }


  private initEditor(): void {
    const options = this.getEditorOptions();
    this._editor = monaco.editor.create(this.container.nativeElement, options);
    this._editor.onDidChangeModelContent((_modelContentChange) => {
      const value = this._editor.getValue();
      this.valueChange.emit(value);
    });
  }

  private getEditorOptions(): MonacoEditorOptions {
    return {
      value: this.value,
      language: this.language
    };
  }
}
