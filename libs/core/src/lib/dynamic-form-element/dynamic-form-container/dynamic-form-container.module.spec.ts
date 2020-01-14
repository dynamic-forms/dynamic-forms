import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIGS } from '../../dynamic-form-config/dynamic-form-config';
import { dynamicFormContainerConfig, DynamicFormContainerModule } from './dynamic-form-container.module';

describe('DynamicFormContainerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormContainerModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(dynamicFormContainerConfig);
    })
  );
});
