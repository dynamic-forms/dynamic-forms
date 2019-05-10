import { async, TestBed } from '@angular/core/testing';
import { DynamicFormComponentFactory, DynamicFormConfigService, DynamicFormValidationService} from '@dynamic-forms/core';
import { DynamicFormControlBootstrapComponent } from './dynamic-form-control.component';
import { DynamicFormControlBootstrapModule } from './dynamic-form-control.module';

describe('DynamicFormControlBootstrapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlBootstrapModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'bootstrap'
          })
        },
        DynamicFormValidationService,
        DynamicFormComponentFactory
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormControlBootstrapComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
