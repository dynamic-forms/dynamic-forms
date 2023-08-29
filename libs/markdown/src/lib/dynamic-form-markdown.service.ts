import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormMarkdownOptions } from './dynamic-form-markdown-options';

export class MarkdownRenderer extends marked.Renderer {
  override link(href: string, title: string, text: string): string {
    const link = super.link(href, title, text);
    return link.replace('<a', '<a target="_blank"');
  }
}

@Injectable()
export class DynamicFormMarkdownService {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    marked.setOptions({ mangle: false, headerIds: false, renderer: new MarkdownRenderer() });
  }

  compile(markdown: string, options?: DynamicFormMarkdownOptions): string {
    const securityContext = this.getSecurityContext(options);
    return this.sanitizer.sanitize(securityContext, this.parseMarkdown(markdown));
  }

  compileFromSource(source: string, options?: DynamicFormMarkdownOptions): Observable<string> {
    return this.httpClient.get(source, { responseType: 'text' }).pipe(
      map(markdown => this.compile(markdown, options)),
    );
  }

  private parseMarkdown(markdown: string): string {
    return marked.parse(markdown);
  }

  private getSecurityContext(options?: DynamicFormMarkdownOptions): SecurityContext {
    return options && !options.sanitize ? SecurityContext.NONE : SecurityContext.HTML;
  }
}
