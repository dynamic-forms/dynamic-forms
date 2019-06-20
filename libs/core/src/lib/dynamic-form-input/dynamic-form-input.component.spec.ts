import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';

@Component({
  selector: 'dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {}

describe('DynamicFormInputComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormInputTestComponent
      ]
    });
  }));

  it('creates component', () => {
    const root = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const field = new DynamicFormControl(root, root, <DynamicFormControlDefinition>{
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
