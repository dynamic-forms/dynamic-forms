import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormLibraryService,
  DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormSwitchComponent } from './dynamic-form-switch.component';
import { BsDynamicFormSwitchModule } from './dynamic-form-switch.module';

describe('BsDynamicFormSwitchComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormSwitchComponent>;
  let component: BsDynamicFormSwitchComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormSwitch>;
  let formControl: DynamicFormControl<DynamicFormSwitch>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormSwitchModule
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

    fixture = TestBed.createComponent(BsDynamicFormSwitchComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label' } } as DynamicFormControlDefinition<DynamicFormSwitch>;
    formControl = new DynamicFormControl<DynamicFormSwitch>(builder, form, form, definition);

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
