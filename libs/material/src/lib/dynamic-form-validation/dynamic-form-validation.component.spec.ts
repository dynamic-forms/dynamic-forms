import { async, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService, DynamicFormValidationService} from '@dynamic-forms/core';
import { DynamicFormValidationMaterialComponent } from './dynamic-form-validation.component';
import { DynamicFormValidationMaterialModule } from './dynamic-form-validation.module';

describe('DynamicFormValidationMaterialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormValidationMaterialModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'material'
          })
        },
        DynamicFormValidationService
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormValidationMaterialComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
