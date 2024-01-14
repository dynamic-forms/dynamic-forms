import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormControl,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormRadio,
  DynamicFormRadioControl,
  DynamicFormRadioDefinition,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MatDynamicFormRadioComponent } from './dynamic-form-radio.component';

describe('MatDynamicFormRadioComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormRadioComponent>;
  let component: MatDynamicFormRadioComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormRadioDefinition;
  let formControl: DynamicFormRadioControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDynamicFormRadioComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormRadioComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = {
      key: 'key',
      template: {
        input: {
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
            { value: 'value3', label: 'label3', disabled: true },
          ],
        },
      },
    } as DynamicFormRadioDefinition;
    formControl = new DynamicFormControl<string | number, DynamicFormRadio>(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const radioDebugElement = fixture.debugElement.query(By.css('mat-radio-group'));
    const inputDebugElements = radioDebugElement.queryAll(By.css('input'));
    const labelDebugElements = radioDebugElement.queryAll(By.css('label'));
    const radioElement = radioDebugElement.nativeElement as HTMLElement;
    const inputElements = inputDebugElements.map(elem => elem.nativeElement) as HTMLInputElement[];
    const labelElements = labelDebugElements.map(elem => elem.nativeElement) as HTMLLabelElement[];

    expect(radioElement).toBeTruthy();
    expect(inputElements.length).toBe(3);
    expect(inputElements[0].id).toBe(`key-0-input`);
    expect(inputElements[0].type).toBe('radio');
    expect(inputElements[0].value).toBe('value1');
    expect(inputElements[0].disabled).toBe(false);
    expect(labelElements[0].innerText).toBe('label1');
    expect(inputElements[1].id).toBe('key-1-input');
    expect(inputElements[1].type).toBe('radio');
    expect(inputElements[1].value).toBe('value2');
    expect(inputElements[1].disabled).toBe(false);
    expect(labelElements[1].innerText).toBe('label2');
    expect(inputElements[2].id).toBe('key-2-input');
    expect(inputElements[2].type).toBe('radio');
    expect(inputElements[2].value).toBe('value3');
    expect(inputElements[2].disabled).toBe(true);
    expect(labelElements[2].innerText).toBe('label3');
  });
});
