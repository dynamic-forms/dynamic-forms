import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary } from './dynamic-form-library';
import { DynamicFormLibraryModule, withDynamicFormsLibrary } from './dynamic-form-library.module';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

describe('DynamicFormLibraryModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormLibraryModule],
      });
    });

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormLibraryService', () => {
      expect(() => TestBed.inject(DynamicFormLibraryService)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with providers using', () => {
    const testLibrary: DynamicFormLibrary = {
      name: 'test',
      references: ['test-core', 'test-core-extended'],
    };
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      { name: 'DynamicFormLibraryModule', def: { imports: [DynamicFormLibraryModule.forLibrary(testLibrary)] } },
      {
        name: 'withDynamicFormsLibrary',
        def: { imports: [DynamicFormLibraryModule], providers: importDynamicFormsProviders(withDynamicFormsLibrary(testLibrary)) },
      },
    ];

    testModules.forEach(testModule => {
      describe(`${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
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
  });
});
