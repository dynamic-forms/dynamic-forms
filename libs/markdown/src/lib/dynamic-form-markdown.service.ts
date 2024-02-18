import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DynamicFormMarkdownOptions } from './dynamic-form-markdown-options';

export class MarkdownRenderer extends marked.Renderer {
  override link(href: string, title: string, text: string): string {
    const link = super.link(href, title, text);
    return link.replace('<a', '<a target="_blank"');
  }
}

@Injectable()
export class DynamicFormMarkdownService {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    marked.setOptions({ renderer: new MarkdownRenderer() });
  }

  compile(markdown: string, options?: DynamicFormMarkdownOptions): Observable<string> {
    const securityContext = this.getSecurityContext(options);
    return this.parseMarkdown(markdown).pipe(map(m => this.sanitizer.sanitize(securityContext, m)));
  }

  compileFromSource(source: string, options?: DynamicFormMarkdownOptions): Observable<string> {
    return this.httpClient.get(source, { responseType: 'text' }).pipe(switchMap(markdown => this.compile(markdown, options)));
  }

  private parseMarkdown(markdown: string): Observable<string> {
    const parsedMarkdown = marked.parse(markdown);
    return typeof parsedMarkdown === 'string' ? of(parsedMarkdown) : from(parsedMarkdown);
  }

  private getSecurityContext(options?: DynamicFormMarkdownOptions): SecurityContext {
    return options && !options.sanitize ? SecurityContext.NONE : SecurityContext.HTML;
  }
}
