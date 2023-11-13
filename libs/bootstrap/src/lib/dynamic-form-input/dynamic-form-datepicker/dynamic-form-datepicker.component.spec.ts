import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormDatepickerControl,
  DynamicFormDatepickerDefinition,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

describe('BsDynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormDatepickerComponent>;
  let component: BsDynamicFormDatepickerComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormDatepickerDefinition;
  let formControl: DynamicFormDatepickerControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormDatepickerComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormDatepickerDefinition;
    formControl = new DynamicFormDatepickerControl(builder, form, form, definition, {} as DynamicFormFieldType);

    component.field = formControl;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('renders component template', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('date');
  });

  it('sets dynamic form control to readonly', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
