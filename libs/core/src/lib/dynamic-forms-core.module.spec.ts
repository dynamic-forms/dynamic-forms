import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from './dynamic-form/dynamic-form-config.service';
import { DynamicFormsCoreModule } from './dynamic-forms-core.module';

describe('DynamicFormsCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormsCoreModule.forRoot()
      ],
    }).compileComponents();
  }));

  it('provides DynamicFormConfigService',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      expect(service).toBeDefined();
    })
  );
});
