import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormNumberboxControl,
  DynamicFormNumberboxDefinition,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MatDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

describe('MatDynamicFormNumberboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormNumberboxComponent>;
  let component: MatDynamicFormNumberboxComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormNumberboxDefinition;
  let formControl: DynamicFormNumberboxControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDynamicFormNumberboxComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormNumberboxDefinition;
    formControl = new DynamicFormNumberboxControl(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const inputDebugElement = fieldDebugElement.query(By.css('input'));
    const labelDebugElement = fieldDebugElement.query(By.css('label'));
    const fieldElement = fieldDebugElement.nativeElement as HTMLElement;
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(fieldElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('number');
    expect(labelElement.innerText).toBe('label');
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
