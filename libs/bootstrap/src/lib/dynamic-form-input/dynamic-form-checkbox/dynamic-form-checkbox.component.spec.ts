import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormCheckbox, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormLibraryService, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';
import { BsDynamicFormCheckboxModule } from './dynamic-form-checkbox.module';

describe('BsDynamicFormCheckboxComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormCheckboxComponent>;
  let component: BsDynamicFormCheckboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormCheckbox>;
  let formControl: DynamicFormControl<DynamicFormCheckbox>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormCheckboxModule
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

    fixture = TestBed.createComponent(BsDynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm({} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label' } } as DynamicFormControlDefinition<DynamicFormCheckbox>;
    formControl = new DynamicFormControl<DynamicFormCheckbox>(form, form, definition);

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
    const checkDebugElement = fixture.debugElement.query(By.css('div.custom-control.custom-checkbox'));
    const inputDebugElement = checkDebugElement.query(By.css('input.custom-control-input'));
    const labelDebugElement = checkDebugElement.query(By.css('label.custom-control-label'));
    const checkElement = checkDebugElement.nativeElement as HTMLDivElement;
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(checkElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('checkbox');
    expect(labelElement).toBeTruthy();
    expect(labelElement.htmlFor).toBe(component.inputId);
    expect(labelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('div.custom-control.custom-checkbox'));
    const inputDebugElement = checkDebugElement.query(By.css('input.custom-control-input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
