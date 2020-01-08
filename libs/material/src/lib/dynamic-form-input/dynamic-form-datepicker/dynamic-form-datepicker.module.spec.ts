import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormDatepickerConfig, MatDynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('MatDynamicFormDatepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormDatepickerModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormDatepickerConfig);
    })
  );
});
