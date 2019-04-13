import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormNumberbox } from './dynamic-form-numberbox';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';
import { DynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('DynamicFormNumberboxComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormNumberboxModule
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
    const template = <DynamicFormControlTemplate<DynamicFormNumberbox>>{ key: 'numberbox' };
    const formControl = new DynamicFormControl<DynamicFormNumberbox>(form, form, template);
    const fixture = TestBed.createComponent(DynamicFormNumberboxComponent);
    const component = fixture.componentInstance;

    component.field = formControl;

    expect(component).toBeDefined();
  });
});
