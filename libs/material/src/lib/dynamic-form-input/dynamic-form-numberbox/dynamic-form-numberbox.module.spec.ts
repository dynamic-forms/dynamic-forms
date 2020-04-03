import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputConfig, DYNAMIC_FORM_INPUT_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormNumberboxType, MatDynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('MatDynamicFormNumberboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormNumberboxModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_CONFIG',
    inject([DYNAMIC_FORM_INPUT_CONFIG], (config: DynamicFormInputConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormNumberboxType);
    })
  );
});
