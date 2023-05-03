import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormBuilder, DynamicFormComboboxControl, DynamicFormComboboxDefinition,
  DynamicFormConfigService, DynamicFormDefinition, DynamicFormFieldType, DynamicFormLibraryService,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

describe('MatDynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormComboboxComponent>;
  let component: MatDynamicFormComboboxComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormComboboxDefinition;
  let formControl: DynamicFormComboboxControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDynamicFormComboboxComponent,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormComboboxComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = {
      key: 'key',
      template: {
        label: 'label',
        input: {
          options: [
            'Value1',
            'Value2',
            'Value3',
          ],
        },
      },
    } as DynamicFormComboboxDefinition;
    formControl = new DynamicFormComboboxControl(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
    const fieldElement = fieldDebugElement.nativeElement as HTMLElement;
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(fieldElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('text');
    expect(labelElement.innerText).toBe('label');
    expect(autocompleteDebugElement).toBeTruthy();
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

  it('inits value and options for autocomplete', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
    const autocompleteComponent = autocompleteDebugElement.componentInstance as MatAutocomplete;
    const optionElements = autocompleteComponent.options.toArray();

    expect(inputElement.value).toBe('');
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].value).toBe('Value1');
    expect(optionElements[0].viewValue).toBe('Value1');
    expect(optionElements[1].value).toBe('Value2');
    expect(optionElements[1].viewValue).toBe('Value2');
    expect(optionElements[2].value).toBe('Value3');
    expect(optionElements[2].viewValue).toBe('Value3');
  });

  it('inits value and filtered options for autocomplete', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    inputElement.value = 'Value1';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
    const autocompleteComponent = autocompleteDebugElement.componentInstance as MatAutocomplete;
    const optionElements = autocompleteComponent.options.toArray();

    expect(inputElement.value).toBe('Value1');
    expect(optionElements.length).toBe(1);
    expect(optionElements[0].value).toBe('Value1');
    expect(optionElements[0].viewValue).toBe('Value1');
  });
});
