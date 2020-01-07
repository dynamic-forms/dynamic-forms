import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '../../dynamic-form/dynamic-form-config';
import { dynamicFormContentConfig, DynamicFormContentModule } from './dynamic-form-content.module';

describe('DynamicFormContentModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormContentModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIG], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(dynamicFormContentConfig);
    })
  );
});
