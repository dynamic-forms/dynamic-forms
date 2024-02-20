import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormCombobox,
  DynamicFormComboboxControl,
  DynamicFormComboboxDefinition,
  DynamicFormConfigService,
  DynamicFormControl,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

describe('BsDynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormComboboxComponent>;
  let component: BsDynamicFormComboboxComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormComboboxDefinition;
  let formControl: DynamicFormComboboxControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormComboboxComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormComboboxComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = {
      key: 'key',
      template: {
        label: 'label',
        input: {
          options: ['Value1', 'Value2', 'Value3'],
        },
      },
    } as DynamicFormComboboxDefinition;
    formControl = new DynamicFormControl<string, DynamicFormCombobox>(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const inputListDebugElement = fixture.debugElement.query(By.css('datalist'));
    const inputListItemDebugElements = inputListDebugElement.queryAll(By.css('option'));

    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;
    const inputListElement = inputListDebugElement.nativeElement as HTMLDataListElement;
    const inputListItemElements = inputListItemDebugElements.map(elem => elem.nativeElement) as HTMLOptionElement[];

    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('text');
    expect(inputElement.list).toBe(inputListElement);
    expect(inputListElement.id).toBe('list');
    expect(inputListItemElements.length).toBe(3);
    expect(inputListItemElements[0].value).toBe('Value1');
    expect(inputListItemElements[0].innerText).toBe('Value1');
    expect(inputListItemElements[1].value).toBe('Value2');
    expect(inputListItemElements[1].innerText).toBe('Value2');
    expect(inputListItemElements[2].value).toBe('Value3');
    expect(inputListItemElements[2].innerText).toBe('Value3');
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
