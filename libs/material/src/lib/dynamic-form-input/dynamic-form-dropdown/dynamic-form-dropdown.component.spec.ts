import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelect } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormDropdown, DynamicFormTemplate, DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown.component';
import { DynamicFormDropdownModule } from './dynamic-form-dropdown.module';

describe('DynamicFormDropdownComponent', () => {
  let fixture: ComponentFixture<DynamicFormDropdownComponent>;
  let component: DynamicFormDropdownComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormDropdown>;
  let formControl: DynamicFormControl<DynamicFormDropdown>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDropdownModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormDropdownComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormDropdown>>{
      key: 'key',
      label: 'label',
      input: {
        placeholder: 'placeholder',
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' }
        ]
      }
    };
    formControl = new DynamicFormControl<DynamicFormDropdown>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const selectDebugElement = fieldDebugElement.query(By.css('mat-select'));
    const selectComponent = <MatSelect>selectDebugElement.componentInstance;
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const selectElement = <HTMLElement>selectDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;
    const optionElements = selectComponent.options.toArray();

    expect(fieldElement).toBeDefined();
    expect(labelElement.innerText).toBe('label');
    expect(selectElement.id).toBe(component.id);
    expect(optionElements.length).toBe(2);
    expect(optionElements[0].value).toBe('value1');
    expect(optionElements[0].viewValue).toBe('label1');
    expect(optionElements[1].value).toBe('value2');
    expect(optionElements[1].viewValue).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const fieldElement = <HTMLSelectElement>fieldDebugElement.nativeElement;

    expect(fieldElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(fieldElement.className).toContain('readonly');
  });
});
