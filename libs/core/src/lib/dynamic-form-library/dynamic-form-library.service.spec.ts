import { inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary, DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

describe('DynamicFormLibraryService', () => {
  describe('with DYNAMIC_FORM_LIBRARY', () => {
    const library: DynamicFormLibrary = { name: 'test' };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: library
          },
          DynamicFormLibraryService
        ]
      });
    });

    it('returns library, library names and library names in reverse order',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ 'test' ]);
        expect(service.libraryNamesReverse).toEqual([ 'test' ]);
      })
    );

    it('returns filtered types',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        const type1 = { type: 'type1', libraryName: 'test' };
        const types2 = [
          { type: 'type2', libraryName: 'test' },
          { type: 'type3', libraryName: 'test' },
          { type: 'type4', libraryName: 'other' }
        ];
        const type3 = { type: 'type3', libraryName: 'other' };
        const type4 = { type: 'type4', libraryName: 'test' };

        const filteredTypes = service.filterTypes([ type1, types2, type3, type4 ]);

        expect(filteredTypes).toEqual([ type1, types2[0], types2[1], type4 ]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY including library references', () => {
    const library: DynamicFormLibrary = {
      name: 'test',
      references: [ 'test-core', 'test-core-extension' ]
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: library
          },
          DynamicFormLibraryService
        ]
      });
    });

    it('returns library, library names and library names in reverse order',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ 'test', 'test-core-extension', 'test-core' ]);
        expect(service.libraryNamesReverse).toEqual([ 'test-core', 'test-core-extension', 'test' ]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY being dynamicFormLibrary', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: dynamicFormLibrary
          },
          DynamicFormLibraryService
        ]
      });
    });

    it('returns library, library names and library names in reverse order',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service.library).toEqual( dynamicFormLibrary);
        expect(service.libraryNames).toEqual([ 'core' ]);
        expect(service.libraryNamesReverse).toEqual([ 'core' ]);
      })
    );
  });
});
