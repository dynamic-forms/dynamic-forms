import { async, TestBed } from '@angular/core/testing';
import { DynamicFormComponentFactory, DynamicFormConfigService, DynamicFormValidationService} from '@dynamic-forms/core';
import { BsDynamicFormControlComponent} from './dynamic-form-control.component';
import { BsDynamicFormControlModule } from './dynamic-form-control.module';

describe('BsDynamicFormControlComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlModule
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
    const fixture = TestBed.createComponent(BsDynamicFormControlComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
