import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';

@Component({
  selector: 'dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

describe('DynamicFormInputBase', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormInputTestComponent
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ name: 'test' })
        },
        DynamicFormValidationService
      ]
    });
  }));

  it('creates component', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const field = new DynamicFormControl(form, form, <DynamicFormControlDefinition>{
      key: 'key',
      template: {
        input: {
          type: 'input'
        },
        hints: {},
        validation: {}
      }
    });

    const fixture = TestBed.createComponent(DynamicFormInputTestComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('key');
    expect(component.template).toBe(field.template);
    expect(component.control).toBe(field.control);
    expect(component.input).toBe(field.template.input);
    expect(component.hints).toBe(field.template.hints);
    expect(component.validation).toBe(field.template.validation);
  });
});
