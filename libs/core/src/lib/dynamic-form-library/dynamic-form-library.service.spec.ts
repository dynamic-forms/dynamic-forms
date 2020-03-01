import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary, DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

describe('DynamicFormLibraryService', () => {
  describe('with DYNAMIC_FORM_LIBRARY', () => {
    const library: DynamicFormLibrary = { name: 'test' };

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

    it('returns library, library names and library names in reverse order',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ 'test' ]);
        expect(service.libraryNamesReverse).toEqual([ 'test' ]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY including library references', () => {
    const library: DynamicFormLibrary = {
      name: 'test',
      references: [ 'test-core', 'test-core-extension' ]
    };

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

    it('returns library, library names and library names in reverse order',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ 'test', 'test-core-extension', 'test-core' ]);
        expect(service.libraryNamesReverse).toEqual([ 'test-core', 'test-core-extension', 'test' ]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY being dynamicFormLibrary', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: dynamicFormLibrary
          },
          DynamicFormLibraryService
        ]
      });
    }));

    it('returns library, library names and library names in reverse order',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual( dynamicFormLibrary);
        expect(service.libraryNames).toEqual([ 'core' ]);
        expect(service.libraryNamesReverse).toEqual([ 'core' ]);
      })
    );
  });
});
