import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormTextboxConfig, MatDynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('MatDynamicFormTextboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTextboxModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormTextboxConfig);
    })
  );
});
