import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '../dynamic-form/dynamic-form-config';
import { dynamicFormControlConfig, DynamicFormControlModule } from './dynamic-form-control.module';

describe('DynamicFormControlModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(dynamicFormControlConfig);
    })
  );
});
