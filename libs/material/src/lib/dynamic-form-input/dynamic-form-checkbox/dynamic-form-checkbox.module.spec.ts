import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIGS } from '@dynamic-forms/core';
import { matDynamicFormCheckboxConfig, MatDynamicFormCheckboxModule } from './dynamic-form-checkbox.module';

describe('MatDynamicFormCheckboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormCheckboxModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormCheckboxConfig);
    })
  );
});
