import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary, DynamicFormLibrary, DynamicFormLibraryName, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

describe('DynamicFormLibraryService', () => {
  describe('with DYNAMIC_FORM_LIBRARY', () => {
    const libraryName: DynamicFormLibraryName = 'text';
    const library: DynamicFormLibrary = { name: libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: library
          },
          DynamicFormLibraryService
        ]
      });
    }));

    it('returns DynamicFormLibraryService with configs being empty',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ libraryName ]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY and configs for single library', () => {
    const libraryName: DynamicFormLibraryName = 'text';
    const library: DynamicFormLibrary = { name: libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
          DynamicFormLibraryService
        ]
      });
    }));

    it('returns DynamicFormLibraryService',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ libraryName ]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY and configs for multiple libraries', () => {
    const coreLibraryName: DynamicFormLibraryName = dynamicFormLibrary.name;
    const libraryName: DynamicFormLibraryName = 'test';
    const library: DynamicFormLibrary = { name: libraryName, references: [ coreLibraryName ] };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
          DynamicFormLibraryService
        ]
      });
    }));

    it('returns DynamicFormLibraryService with configs being filtered and merged',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ libraryName, coreLibraryName ]);
      })
    );
  });
});
