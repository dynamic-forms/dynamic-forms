import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormBuilder, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDatepicker, DynamicFormDefinition,
  DynamicFormLibraryService, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';
import { MatDynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('MatDynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormDatepickerComponent>;
  let component: MatDynamicFormDatepickerComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormDatepicker>;
  let formControl: DynamicFormControl<DynamicFormDatepicker>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormDatepickerModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormConfigService,
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormControlDefinition<DynamicFormDatepicker>;
    formControl = new DynamicFormControl<DynamicFormDatepicker>(builder, form, form, definition);

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
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
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
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
