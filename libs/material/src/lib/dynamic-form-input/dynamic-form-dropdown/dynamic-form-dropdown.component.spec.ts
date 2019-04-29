import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelect } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormDropdown, DynamicFormTemplate } from '@dynamic-forms/core';
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
        }
      ]
    }).compileComponents();

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
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formLabelDebugElement = formFieldDebugElement.query(By.css('label.mat-form-field-label'));
    const formSelectDebugElement = formFieldDebugElement.query(By.css('mat-select'));
    const formSelectComponent = <MatSelect>formSelectDebugElement.componentInstance;
    const formFieldElement = <HTMLElement>formFieldDebugElement.nativeElement;
    const formSelectElement = <HTMLElement>formSelectDebugElement.nativeElement;
    const formLabelElement = <HTMLLabelElement>formLabelDebugElement.nativeElement;
    const formOptionElements = formSelectComponent.options.toArray();

    expect(formFieldElement).toBeDefined();
    expect(formLabelElement.innerText).toBe('label');
    expect(formSelectElement.id).toBe(component.id);
    expect(formOptionElements.length).toBe(2);
    expect(formOptionElements[0].value).toBe('value1');
    expect(formOptionElements[0].viewValue).toBe('label1');
    expect(formOptionElements[1].value).toBe('value2');
    expect(formOptionElements[1].viewValue).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formFieldElement = <HTMLSelectElement>formFieldDebugElement.nativeElement;

    expect(formFieldElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formFieldElement.className).toContain('readonly');
  });
});
