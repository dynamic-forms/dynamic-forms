import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '../dynamic-form-config/dynamic-form-config';
import { dynamicFormGroupConfig, DynamicFormGroupModule } from './dynamic-form-group.module';

describe('DynamicFormGroupModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormGroupModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(dynamicFormGroupConfig);
    })
  );
});
