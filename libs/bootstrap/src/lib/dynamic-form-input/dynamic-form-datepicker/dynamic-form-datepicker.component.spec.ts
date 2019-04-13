import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormDatepicker } from './dynamic-form-datepicker';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';
import { DynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('DynamicFormDatepickerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDatepickerModule
      ]
    });
  }));

  it('creates component', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{}, {});
    const template = <DynamicFormControlTemplate<DynamicFormDatepicker>>{ key: 'datepicker' };
    const formControl = new DynamicFormControl<DynamicFormDatepicker>(form, form, template);
    const fixture = TestBed.createComponent(DynamicFormDatepickerComponent);
    const component = fixture.componentInstance;

    component.field = formControl;

    expect(component).toBeDefined();
  });
});
