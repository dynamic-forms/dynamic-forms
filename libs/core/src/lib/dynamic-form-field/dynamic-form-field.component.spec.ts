import { Component, NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from '../dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldComponent } from './dynamic-form-field.component';
import { DynamicFormFieldModule } from './dynamic-form-field.module';

class DynamicFormFieldTest extends DynamicFormField {
  check() {}
  destroy() {}

  reset() {}
  resetDefault() {}
  validate() {}
}

@Component({
  selector: 'dynamic-field-test',
  template: `<div>Dynamic Field</div>`
})
class DynamicFormFieldWrapperComponent extends DynamicFormFieldWrapper {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [
    DynamicFormFieldModule
  ],
  declarations: [
    DynamicFormFieldWrapperComponent
  ],
  entryComponents: [
    DynamicFormFieldWrapperComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        library: 'test',
        fieldConfig: {
          types: [
            { type: 'field', component: DynamicFormFieldWrapperComponent }
          ]
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ]
})
class DynamicFormFieldComponentTestModule {}

describe('DynamicFormFieldComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormFieldComponentTestModule
      ]
    });
  }));

  it('creates component', () => {
    const definition = <DynamicFormFieldDefinition>{ key: 'key', type: 'field', template: {} };
    const field = new DynamicFormFieldTest(null, null, definition);
    const fixture = TestBed.createComponent(DynamicFormFieldComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('key');
    expect(component.field).toBe(field);
    expect(component.template).toBe(definition.template);
  });
});
