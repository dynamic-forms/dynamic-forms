import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DynamicFormElement, DynamicFormMarkdownTemplate } from '@dynamic-forms/core';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
})
export class MarkdownComponent implements OnInit, OnChanges {
  element: DynamicFormElement< DynamicFormMarkdownTemplate>;

  @Input()
  source: string;

  ngOnInit(): void {
    this.element = new DynamicFormElement<DynamicFormMarkdownTemplate>({
      template: { source: this.source }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.source.firstChange && this.source !== this.element.template.source) {
      this.element.template.source = this.source;
    }
  }
}
