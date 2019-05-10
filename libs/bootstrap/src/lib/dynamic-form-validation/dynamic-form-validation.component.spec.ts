import { async, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService, DynamicFormValidationService} from '@dynamic-forms/core';
import { DynamicFormValidationBootstrapComponent } from './dynamic-form-validation.component';
import { DynamicFormValidationBootstrapModule } from './dynamic-form-validation.module';

describe('DynamicFormValidationBootstrapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormValidationBootstrapModule
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
    }).compileComponents();
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormValidationBootstrapComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
