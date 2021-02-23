import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormBuilder, DynamicFormComponentFactory, DynamicFormConfigService,
  DynamicFormEvaluationBuilder, DynamicFormExpressionBuilder, DynamicFormIdBuilder,
  DynamicFormLibrary, DynamicFormLibraryService, DynamicFormValidationBuilder,
  DynamicFormValidationService, DYNAMIC_FORM_ID_BUILDER, DYNAMIC_FORM_LIBRARY,
  DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';
import { BsDynamicFormsModule } from './dynamic-forms.module';

describe('BsDynamicFormsModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BsDynamicFormsModule
        ]
      });
    });

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_THEME', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_THEME)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_ID_BUILDER', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_ID_BUILDER)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormLibraryService', () => {
      expect(() => TestBed.inject(DynamicFormLibraryService)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError(/NullInjectorError/);
    });

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormEvaluationBuilder)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormValidationBuilder)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.inject(DynamicFormComponentFactory)).toThrowError(/NullInjectorError/);
    });
  });

  describe('forRoot', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BsDynamicFormsModule.forRoot()
        ]
      });
    });

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(bsDynamicFormLibrary);
      })
    );

    it('provides DYNAMIC_FORM_THEME being undefined',
      inject([DYNAMIC_FORM_THEME], (theme: string) => {
        expect(theme).toBeUndefined();
      })
    );

    it('provides DYNAMIC_FORM_ID_BUILDER being undefined',
      inject([DYNAMIC_FORM_ID_BUILDER], (service: DynamicFormIdBuilder) => {
        expect(service).toBeUndefined();
      })
    );

    it('provides DynamicFormLibraryService',
      inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service).toBeTruthy();
        expect(service.library).toEqual(bsDynamicFormLibrary);
        expect(service.libraryNames).toEqual([ 'bootstrap', 'core' ]);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormBuilder',
      inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormValidationService',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormComponentFactory',
      inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
        expect(service).toBeTruthy();
      })
    );
  });

  describe('forRoot with config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BsDynamicFormsModule.forRoot({
            theme: 'theme',
            idBuilder: () => 'dynamic-form-id'
          })
        ]
      });
    });

    it('provides DYNAMIC_FORM_THEME',
      inject([DYNAMIC_FORM_THEME], (theme: string) => {
        expect(theme).toBe('theme');
      })
    );

    it('provides DYNAMIC_FORM_ID_BUILDER being undefined',
      inject([DYNAMIC_FORM_ID_BUILDER], (service: DynamicFormIdBuilder) => {
        expect(service).toBeTruthy();
      })
    );
  });
});
