import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormControl,
  DynamicFormDatepicker,
  DynamicFormDatepickerControl,
  DynamicFormDatepickerDefinition,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { MatDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

describe('MatDynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormDatepickerComponent>;
  let component: MatDynamicFormDatepickerComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormDatepickerDefinition;
  let formControl: DynamicFormDatepickerControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDynamicFormDatepickerComponent],
      providers: [
        provideNativeDateAdapter(),
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    builder = MockService(DynamicFormBuilder);

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormDatepickerDefinition;
    formControl = new DynamicFormControl<string | Date, DynamicFormDatepicker>(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const labelDebugElement = fieldDebugElement.query(By.css('label'));
    const inputDebugElement = fieldDebugElement.query(By.css('input'));
    const fieldElement = fieldDebugElement.nativeElement as HTMLElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(fieldElement).toBeTruthy();
    expect(labelElement.innerText).toBe('label');
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('text');
  });

  it('sets dynamic form control to readonly', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
