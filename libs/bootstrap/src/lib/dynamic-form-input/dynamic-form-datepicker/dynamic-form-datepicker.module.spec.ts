import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIGS } from '@dynamic-forms/core';
import { bsDynamicFormDatepickerConfig, BsDynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('BsDynamicFormDatepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormDatepickerModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(bsDynamicFormDatepickerConfig);
    })
  );
});
