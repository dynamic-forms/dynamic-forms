import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIGS } from '@dynamic-forms/core';
import { matDynamicFormComboboxConfig, MatDynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('MatDynamicFormComboboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormComboboxModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(matDynamicFormComboboxConfig);
    })
  );
});
