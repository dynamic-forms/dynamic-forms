import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { filter, Observable, take, tap } from 'rxjs';
import { MonacoEditorService } from './monaco-editor.service';

declare let monaco: any;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: [ './monaco-editor.component.scss']
})
export class MonacoEditorComponent implements AfterViewInit {
  readonly isLoading$: Observable<boolean>;

  @ViewChild('container', { static: true }) container: ElementRef;

  constructor(private monacoEditorService: MonacoEditorService) {
    this.isLoading$ = this.monacoEditorService.isLoading.asObservable();
    this.monacoEditorService.load();
  }

  ngAfterViewInit(): void {
    this.monacoEditorService.isLoaded.pipe(
      filter(isLoaded => !!isLoaded),
      take(1),
      tap(_ => this.initEditor())
    ).subscribe();
  }

  private initEditor(): void {
    monaco.editor.create(this.container.nativeElement, {
      value: ['{', '}'].join('\n'),
      language: 'json'
    });
  }
}
