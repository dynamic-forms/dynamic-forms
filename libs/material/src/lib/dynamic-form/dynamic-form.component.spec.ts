import { async, TestBed } from '@angular/core/testing';
import { DynamicFormBuilder, DynamicFormConfigService, DynamicFormExpressionBuilder,
  DynamicFormValidationBuilder } from '@dynamic-forms/core';
import { DynamicFormMaterialComponent } from './dynamic-form.component';
import { DynamicFormMaterialModule } from './dynamic-form.module';

describe('DynamicFormMaterialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormMaterialModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'material'
          })
        },
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormMaterialComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
