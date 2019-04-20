import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormTemplate, DynamicFormTextarea } from '@dynamic-forms/core';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { DynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('DynamicFormTextareaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextareaModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        }
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
