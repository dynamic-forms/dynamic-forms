import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';
import { DynamicFormLibraryModule } from './dynamic-form-library.module';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

describe('DynamicFormLibraryModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormLibraryModule
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_LIBRARY)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormLibraryService', () => {
      expect(() => TestBed.get(DynamicFormLibraryService)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('with providers', () => {
    const testLibrary: DynamicFormLibrary = {
      name: 'test',
      references: [ 'test-core', 'test-core-extended' ]
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormLibraryModule.forLibrary(testLibrary)
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(testLibrary);
      })
    );

    it('provides DynamicFormLibraryService',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service).toBeDefined();
        expect(service.library).toEqual(testLibrary);
      })
    );
  });
});
