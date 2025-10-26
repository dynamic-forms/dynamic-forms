import { TestBed, inject } from '@angular/core/testing';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary } from './dynamic-form-library';
import { withDynamicFormsLibrary } from './dynamic-form-library.module';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

describe('DynamicFormLibraryModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError();
    });

    it('does not provide DynamicFormLibraryService', () => {
      expect(() => TestBed.inject(DynamicFormLibraryService)).toThrowError();
    });
  });

  describe('with providers using', () => {
    const testLibrary: DynamicFormLibrary = {
      name: 'test',
      references: ['test-core', 'test-core-extended'],
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DynamicFormLibraryService, importDynamicFormsProviders(withDynamicFormsLibrary(testLibrary))],
      });
    });

    it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
      expect(library).toEqual(testLibrary);
    }));

    it('provides DynamicFormLibraryService', inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
      expect(service).toBeTruthy();
      expect(service.library).toEqual(testLibrary);
    }));
  });
});
