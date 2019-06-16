import { async, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService, DynamicFormValidationService} from '@dynamic-forms/core';
import { BsDynamicFormValidationComponent } from './dynamic-form-validation.component';
import { BsDynamicFormValidationModule } from './dynamic-form-validation.module';

describe('BsDynamicFormValidationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormValidationModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'bootstrap'
          })
        },
        DynamicFormValidationService
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(BsDynamicFormValidationComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
