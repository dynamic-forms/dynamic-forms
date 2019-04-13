import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormTextbox } from './dynamic-form-textbox';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox.component';
import { DynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('DynamicFormTextboxComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextboxModule
      ]
    });
  }));

  it('creates component', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{}, {});
    const template = <DynamicFormControlTemplate<DynamicFormTextbox>>{ key: 'textbox' };
    const formControl = new DynamicFormControl<DynamicFormTextbox>(form, form, template);
    const fixture = TestBed.createComponent(DynamicFormTextboxComponent);
    const component = fixture.componentInstance;

    component.field = formControl;

    expect(component).toBeDefined();
  });
});
