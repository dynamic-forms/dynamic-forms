import { async, TestBed } from '@angular/core/testing';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormDropdown, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown.component';
import { DynamicFormDropdownModule } from './dynamic-form-dropdown.module';

describe('DynamicFormDropdownComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDropdownModule
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
    const template = <DynamicFormControlTemplate<DynamicFormDropdown>>{ key: 'dropdown' };
    const formControl = new DynamicFormControl<DynamicFormDropdown>(form, form, template);
    const fixture = TestBed.createComponent(DynamicFormDropdownComponent);
    const component = fixture.componentInstance;

    component.field = formControl;

    expect(component).toBeDefined();
  });
});
