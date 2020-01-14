import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { dynamicFormConfig, DynamicFormConfig, DYNAMIC_FORM_CONFIGS, DYNAMIC_FORM_LIBRARY } from './dynamic-form-config';
import { DynamicFormConfigModule } from './dynamic-form-config.module';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_LIBRARY)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_CONFIG', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_CONFIGS)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.get(DynamicFormConfigService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormBuilder', () => {
      expect(() => TestBed.get(DynamicFormBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormExpressionBuilder', () => {
      expect(() => TestBed.get(DynamicFormExpressionBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.get(DynamicFormEvaluationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.get(DynamicFormValidationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.get(DynamicFormValidationService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.get(DynamicFormComponentFactory)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('forRoot with default config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.forRoot()
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: string) => {
        expect(library).toBe('core');
      })
    );

    it('provides DYNAMIC_FORM_CONFIG',
      inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(dynamicFormConfig);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config).toEqual(dynamicFormConfig);
      })
    );
  });

  describe('forRoot with provided config', () => {
    const config: DynamicFormConfig = {
      library: 'core'
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.forRoot(config)
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: string) => {
        expect(library).toBe('core');
      })
    );

    it('provides DYNAMIC_FORM_CONFIG',
      inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config).toEqual(config);
      })
    );
  });

  describe('forChild with provided config', () => {
    const config: DynamicFormConfig = {
      library: 'core'
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.forChild(config)
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_LIBRARY)).toThrowError(/StaticInjectorError/);
    });

    it('provides DYNAMIC_FORM_CONFIG',
      inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.get(DynamicFormConfigService)).toThrowError(/StaticInjectorError/);
    });
  });
});
