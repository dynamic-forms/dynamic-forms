import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormRadioConfig, MatDynamicFormRadioModule } from './dynamic-form-radio.module';

describe('MatDynamicFormRadioModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormRadioModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormRadioConfig);
    })
  );
});
