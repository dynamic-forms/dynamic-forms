import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';

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
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const field = new DynamicFormControl(root, root, <DynamicFormControlTemplate>{
      key: 'key',
      input: {
        type: 'input'
      },
      hints: {},
      validation: {}
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
