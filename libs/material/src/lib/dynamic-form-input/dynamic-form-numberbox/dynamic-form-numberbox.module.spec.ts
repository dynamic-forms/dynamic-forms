import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormNumberboxConfig, MatDynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('MatDynamicFormNumberboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormNumberboxModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormNumberboxConfig);
    })
  );
});
