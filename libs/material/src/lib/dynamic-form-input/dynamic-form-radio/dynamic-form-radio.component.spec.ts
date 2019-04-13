import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormRadio } from './dynamic-form-radio';
import { DynamicFormRadioComponent } from './dynamic-form-radio.component';
import { DynamicFormRadioModule } from './dynamic-form-radio.module';

describe('DynamicFormRadioComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormRadioModule
      ]
    });
  }));

  it('creates component', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{}, {});
    const template = <DynamicFormControlTemplate<DynamicFormRadio>>{ key: 'radio' };
    const formControl = new DynamicFormControl<DynamicFormRadio>(form, form, template);
    const fixture = TestBed.createComponent(DynamicFormRadioComponent);
    const component = fixture.componentInstance;

    component.field = formControl;

    expect(component).toBeDefined();
  });
});
