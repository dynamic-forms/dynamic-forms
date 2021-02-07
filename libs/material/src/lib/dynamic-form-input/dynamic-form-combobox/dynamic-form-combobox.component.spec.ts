import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormCombobox, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormLibraryService, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormComboboxComponent } from './dynamic-form-combobox.component';
import { MatDynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('MatDynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormComboboxComponent>;
  let component: MatDynamicFormComboboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormCombobox>;
  let formControl: DynamicFormControl<DynamicFormCombobox>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormComboboxModule,
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

    fixture = TestBed.createComponent(MatDynamicFormComboboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm({} as DynamicFormDefinition, {});
    definition = {
      key: 'key',
      template: {
        label: 'label',
        input: {
          options: [
            'Value1',
            'Value2',
            'Value3'
          ]
        }
      }
    } as DynamicFormControlDefinition<DynamicFormCombobox>;
    formControl = new DynamicFormControl<DynamicFormCombobox>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  }));

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('renders component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
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

  it('sets dynamic form control to readonly', waitForAsync(() => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(inputElement.readOnly).toBe(true);
    });
  }));

  it('inits value and options for autocomplete', waitForAsync(() => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
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
  }));

  it('inits value and filtered options for autocomplete', waitForAsync(() => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    inputElement.value = 'Value1';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
      const autocompleteComponent = autocompleteDebugElement.componentInstance as MatAutocomplete;
      const optionElements = autocompleteComponent.options.toArray();

      expect(inputElement.value).toBe('Value1');
      expect(optionElements.length).toBe(1);
      expect(optionElements[0].value).toBe('Value1');
      expect(optionElements[0].viewValue).toBe('Value1');
    });
  }));
});
