import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html'
})
export class MonacoEditorComponent implements AfterViewInit {
  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef;

  ngAfterViewInit(): void {
    /*
    monaco.editor.create(this.editorContainer.nativeElement, {
      value: ['{', '}'].join('\n'),
      language: 'json'
    });
    */
  }
}
