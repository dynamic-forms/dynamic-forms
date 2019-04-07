import { async, TestBed } from '@angular/core/testing';
import { DynamicFormBuilder, DynamicFormConfigService, DynamicFormExpressionBuilder,
  DynamicFormValidationBuilder } from '@dynamic-forms/core';
import { DynamicFormBootstrapComponent } from './dynamic-form.component';
import { DynamicFormBootstrapModule } from './dynamic-form.module';

describe('DynamicFormBootstrapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormBootstrapModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'bootstrap'
          })
        },
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormBootstrapComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
