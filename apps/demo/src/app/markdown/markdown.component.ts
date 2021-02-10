import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MarkdownElement } from './markdown.element';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
})
export class MarkdownComponent implements OnInit, OnChanges {
  element: MarkdownElement;

  @Input()
  source: string;

  ngOnInit(): void {
    this.element = new MarkdownElement(this.source);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.source.firstChange && this.source !== this.element.source) {
      this.element.source = this.source;
    }
  }
}
