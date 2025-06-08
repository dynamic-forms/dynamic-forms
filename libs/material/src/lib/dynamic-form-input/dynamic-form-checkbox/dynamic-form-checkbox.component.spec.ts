import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormCheckbox,
  DynamicFormCheckboxControl,
  DynamicFormCheckboxDefinition,
  DynamicFormConfigService,
  DynamicFormControl,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { MatDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

describe('MatDynamicFormCheckboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormCheckboxComponent>;
  let component: MatDynamicFormCheckboxComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormCheckboxDefinition;
  let formControl: DynamicFormCheckboxControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDynamicFormCheckboxComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    builder = MockService(DynamicFormBuilder);

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label' } } as DynamicFormCheckboxDefinition;
    formControl = new DynamicFormControl<boolean, DynamicFormCheckbox>(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const checkDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const inputDebugElement = checkDebugElement.query(By.css('input'));
    const labelDebugElement = checkDebugElement.query(By.css('label'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe('key-input');
    expect(inputElement.type).toBe('checkbox');
    expect(labelElement.innerText).toBe('label');
  });
});
