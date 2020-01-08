import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormTextareaConfig, MatDynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('MatDynamicFormTextareaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTextareaModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormTextareaConfig);
    })
  );
});
