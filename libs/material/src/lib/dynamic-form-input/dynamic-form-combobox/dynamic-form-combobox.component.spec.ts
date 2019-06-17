import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocomplete } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormCombobox, DynamicFormConfig, DynamicFormConfigService,
  DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate, DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormComboboxComponent } from './dynamic-form-combobox.component';
import { DynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('DynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormComboboxComponent>;
  let component: DynamicFormComboboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormCombobox>;
  let formControl: DynamicFormControl<DynamicFormCombobox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComboboxModule,
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

    fixture = TestBed.createComponent(DynamicFormComboboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormCombobox>>{
      key: 'key',
      label: 'label',
      input: {
        options: [
          'Value1',
          'Value2',
          'Value3'
        ]
      }
    };
    formControl = new DynamicFormControl<DynamicFormCombobox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(fieldElement).toBeDefined();
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('text');
    expect(labelElement.innerText).toBe('label');
    expect(autocompleteDebugElement).toBeDefined();
  });

  it('sets dynamic form control to readonly', async(() => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(fieldElement.className).not.toContain('readonly');
    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fieldElement.className).toContain('readonly');
      expect(inputElement.readOnly).toBe(true);
    });
  }));

  it('sets value and options for autocomplete', async(() => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
      const autocompleteComponent = <MatAutocomplete>autocompleteDebugElement.componentInstance;
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

  it('sets value and filtered options for autocomplete', async(() => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    inputElement.value = 'Value1';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const autocompleteDebugElement = fieldDebugElement.query(By.css('mat-autocomplete'));
      const autocompleteComponent = <MatAutocomplete>autocompleteDebugElement.componentInstance;
      const optionElements = autocompleteComponent.options.toArray();

      expect(inputElement.value).toBe('Value1');
      expect(optionElements.length).toBe(1);
      expect(optionElements[0].value).toBe('Value1');
      expect(optionElements[0].viewValue).toBe('Value1');
    });
  }));
});
