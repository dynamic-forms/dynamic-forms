import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SecurityContext } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicFormMarkdownModule } from './dynamic-form-markdown.module';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

describe('DynamicFormMarkdownService', () => {
  let domSanitizer: jasmine.SpyObj<DomSanitizer>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    domSanitizer = jasmine.createSpyObj<DomSanitizer>('domSanitizer', [ 'sanitize' ]);
    domSanitizer.sanitize.and.callFake((_context, value) => value as string);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DynamicFormMarkdownModule
      ],
      providers: [
        {
          provide: DomSanitizer,
          useValue: domSanitizer
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('returns parsed markdown',
    inject([DynamicFormMarkdownService], (service: DynamicFormMarkdownService) => {
      const markdown = '# Title';
      const result = service.parse(markdown);

      expect(result).toBe('<h1>Title</h1>\n');
      expect(domSanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.HTML, '<h1>Title</h1>\n');
    })
  );

  it('returns parsed markdown without sanitization',
    inject([DynamicFormMarkdownService], (service: DynamicFormMarkdownService) => {
      const markdown = '# Title';
      const result = service.parse(markdown, { sanitize: false });

      expect(result).toBe('<h1>Title</h1>\n');
      expect(domSanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.NONE, '<h1>Title</h1>\n');
    })
  );

  it('loads and returns parsde markdown',
    inject([DynamicFormMarkdownService], (service: DynamicFormMarkdownService) => {
      const markdown = '# Title';

      service.load('assets/README.md').subscribe(result => {
        expect(result).toBe('<h1>Title</h1>\n');
        expect(domSanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.HTML, '<h1>Title</h1>\n');
      });

      const req = httpTestingController.expectOne('assets/README.md');

      expect(req.request.method).toEqual('GET');
      expect(req.request.responseType).toEqual('text');

      req.flush(markdown);

      httpTestingController.verify();
    })
  );

  it('loads and returns parsde markdown',
    inject([DynamicFormMarkdownService], (service: DynamicFormMarkdownService) => {
      const markdown = '# Title';

      service.load('assets/README.md', { sanitize: false }).subscribe(result => {
        expect(result).toBe('<h1>Title</h1>\n');
        expect(domSanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.NONE, '<h1>Title</h1>\n');
      });

      const req = httpTestingController.expectOne('assets/README.md');

      expect(req.request.method).toEqual('GET');
      expect(req.request.responseType).toEqual('text');

      req.flush(markdown);

      httpTestingController.verify();
    })
  );
});
