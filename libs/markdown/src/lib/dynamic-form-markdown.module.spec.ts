import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormConfigService, DynamicFormLibraryService, dynamicFormLibrary } from '@dynamic-forms/core';
import { DynamicFormMarkdownModule, dynamicFormMarkdownType } from './dynamic-form-markdown.module';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

describe('DynamicFormMarkdownModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormMarkdownModule,
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(dynamicFormLibrary),
          },
        ],
      });
    });

    it('provides DYNAMIC_FORM_ELEMENT_TYPES',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const types = service.elementTypes;

        expect(types.length).toBe(1);
        expect(types[0]).toEqual(dynamicFormMarkdownType);
        expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
      }),
    );

    it('does not provide DynamicFormMarkdownService', () => {
      expect(() => TestBed.inject(DynamicFormMarkdownService)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with providers of BrowserModule and HttpClientModule', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          HttpClientModule,
          DynamicFormMarkdownModule,
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(dynamicFormLibrary),
          },
        ],
      });
    });

    it('provides DynamicFormMarkdownService',
      inject([DynamicFormMarkdownService], (service: DynamicFormMarkdownService) => {
        expect(service).toBeTruthy();
      }),
    );

  });
});
