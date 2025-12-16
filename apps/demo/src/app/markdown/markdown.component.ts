import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { DynamicFormMarkdownComponent, DynamicFormMarkdownService } from '@dynamic-forms/markdown';
import { MarkdownElement } from './markdown.element';

@Component({
  selector: 'app-markdown',
  imports: [DynamicFormMarkdownComponent],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
  providers: [DynamicFormMarkdownService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent implements OnInit, OnChanges {
  element: MarkdownElement;

  readonly source = input<string>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    const source = this.source();
    if (!changes.source.firstChange && source !== this.element.source) {
      this.element.source = source;
    }
  }

  ngOnInit(): void {
    this.element = new MarkdownElement(this.source());
  }
}
