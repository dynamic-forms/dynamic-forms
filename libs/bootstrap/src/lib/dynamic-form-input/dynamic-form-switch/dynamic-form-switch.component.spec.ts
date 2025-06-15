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
  DynamicFormSwitch,
  DynamicFormSwitchControl,
  DynamicFormSwitchDefinition,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { BsDynamicFormSwitchComponent } from './dynamic-form-switch.component';

describe('BsDynamicFormSwitchComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormSwitchComponent>;
  let component: BsDynamicFormSwitchComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormSwitchDefinition;
  let formControl: DynamicFormSwitchControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormSwitchComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormSwitchComponent);
    component = fixture.componentInstance;

    builder = MockService(DynamicFormBuilder);

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label' } } as DynamicFormSwitchDefinition;
    formControl = new DynamicFormControl<boolean, DynamicFormSwitch>(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const checkDebugElement = fixture.debugElement.query(By.css('div.form-check.form-switch'));
    const inputDebugElement = checkDebugElement.query(By.css('input.form-check-input'));
    const labelDebugElement = checkDebugElement.query(By.css('label.form-check-label'));
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
    const checkDebugElement = fixture.debugElement.query(By.css('div.form-check.form-switch'));
    const inputDebugElement = checkDebugElement.query(By.css('input.form-check-input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
