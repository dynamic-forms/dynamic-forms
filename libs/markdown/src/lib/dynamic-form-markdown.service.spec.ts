import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { provideDynamicFormsMarkdown } from './dynamic-form-markdown.module';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

describe('DynamicFormMarkdownService', () => {
  let domSanitizer: DomSanitizer;
  let service: DynamicFormMarkdownService;
  let httpTestingController: HttpTestingController;
  let sanitizeSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideDynamicFormsMarkdown(),
        MockProvider(DomSanitizer, { sanitize: (_context: SecurityContext, value: string) => value }),
      ],
    });

    domSanitizer = TestBed.inject(DomSanitizer);
    service = TestBed.inject(DynamicFormMarkdownService);
    httpTestingController = TestBed.inject(HttpTestingController);
    sanitizeSpy = spyOn(domSanitizer, 'sanitize').and.callThrough();
  });

  it('returns compiled markdown', done => {
    const markdown = '# Title';

    service.compile(markdown).subscribe(markdownCompiled => {
      expect(markdownCompiled).toBe('<h1>Title</h1>\n');
      expect(sanitizeSpy).toHaveBeenCalledWith(SecurityContext.HTML, '<h1>Title</h1>\n');
      done();
    });
  });

  it('returns compiled markdown with link having blank target', done => {
    const markdown = '[dynamic-forms](https://github.com/dynamic-forms/dynamic-forms)';

    service.compile(markdown).subscribe(markdownCompiled => {
      expect(markdownCompiled).toBe('<p><a target="_blank" href="https://github.com/dynamic-forms/dynamic-forms">dynamic-forms</a></p>\n');
      done();
    });
  });

  it('returns compiled markdown without sanitization', done => {
    const markdown = '# Title';
    service.compile(markdown, { sanitize: false }).subscribe(markdownCompiled => {
      expect(markdownCompiled).toBe('<h1>Title</h1>\n');
      expect(sanitizeSpy).toHaveBeenCalledWith(SecurityContext.NONE, '<h1>Title</h1>\n');
      done();
    });
  });

  it('returns compiled markdown from source', () => {
    const markdown = '# Title';

    service.compileFromSource('/assets/README.md').subscribe(markdownCompiled => {
      expect(markdownCompiled).toBe('<h1>Title</h1>\n');
      expect(sanitizeSpy).toHaveBeenCalledWith(SecurityContext.HTML, '<h1>Title</h1>\n');
    });

    const req = httpTestingController.expectOne('/assets/README.md');

    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('text');

    req.flush(markdown);

    httpTestingController.verify();
  });

  it('returns compiled markdown from source without sanitization', () => {
    const markdown = '# Title';

    service.compileFromSource('assets/README.md', { sanitize: false }).subscribe(markdownCompiled => {
      expect(markdownCompiled).toBe('<h1>Title</h1>\n');
      expect(sanitizeSpy).toHaveBeenCalledWith(SecurityContext.NONE, '<h1>Title</h1>\n');
    });

    const req = httpTestingController.expectOne('assets/README.md');

    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('text');

    req.flush(markdown);

    httpTestingController.verify();
  });
});
