import { Component, DoCheck, OnInit } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormMarkdownDefinition } from './dynamic-form-markdown-definition';
import { DynamicFormMarkdownTemplate } from './dynamic-form-markdown-template';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

@Component({
  selector: 'dynamic-form-markdown',
  templateUrl: './dynamic-form-markdown.component.html',
})
export class DynamicFormMarkdownComponent<
  Template extends DynamicFormMarkdownTemplate = DynamicFormMarkdownTemplate,
  Definition extends DynamicFormMarkdownDefinition<Template> = DynamicFormMarkdownDefinition<Template>
> extends DynamicFormElementBase<Template, Definition> implements OnInit, DoCheck {

  private _markdownSubject: BehaviorSubject<{ source: string; markdown: string }>;

  markdown$: Observable<string>;

  constructor(private markdownService: DynamicFormMarkdownService) {
    super();
  }

  ngOnInit(): void {
    this._markdownSubject = new BehaviorSubject({
      source: this.template.source,
      markdown: this.template.markdown,
    });
    this.markdown$ = this._markdownSubject.asObservable().pipe(
      switchMap(value => value.source
        ? this.markdownService.compileFromSource(value.source, this.definition.options)
        : of(this.markdownService.compile(value.markdown, this.definition.options)),
      ),
    );
  }

  ngDoCheck(): void {
    const source = this.template.source;
    const markdown = this.template.markdown;
    if (this._markdownSubject.value.source !== source || this._markdownSubject.value.markdown !== markdown) {
      this._markdownSubject.next({ source, markdown });
    }
  }
}
