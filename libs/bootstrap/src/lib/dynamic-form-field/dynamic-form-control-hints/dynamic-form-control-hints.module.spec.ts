import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormControlErrorsConfig, BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors.module';

describe('BsDynamicFormControlErrorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlErrorsModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(bsDynamicFormControlErrorsConfig);
    })
  );
});
