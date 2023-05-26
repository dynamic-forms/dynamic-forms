import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DynamicFormMarkdownModule } from '@dynamic-forms/markdown';
import { MarkdownElement } from './markdown.element';

@Component({
  standalone: true,
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: [ './markdown.component.scss' ],
  imports: [DynamicFormMarkdownModule],
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
