import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormTextarea } from './dynamic-form-textarea';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { DynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('DynamicFormTextareaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextareaModule
      ]
    });
  }));

  it('creates component', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{}, {});
    const template = <DynamicFormControlTemplate<DynamicFormTextarea>>{ key: 'textarea' };
    const formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, template);
    const fixture = TestBed.createComponent(DynamicFormTextareaComponent);
    const component = fixture.componentInstance;

    component.field = formControl;

    expect(component).toBeDefined();
  });
});
