import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormLibraryService, DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormSwitchComponent } from './dynamic-form-switch.component';
import { BsDynamicFormSwitchModule } from './dynamic-form-switch.module';

describe('BsDynamicFormSwitchComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormSwitchComponent>;
  let component: BsDynamicFormSwitchComponent;
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

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormSwitch>>{ key: 'key', template: { label: 'label' } };
    formControl = new DynamicFormControl<DynamicFormSwitch>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('renders component template', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('div.custom-control.custom-switch'));
    const inputDebugElement = checkDebugElement.query(By.css('input.custom-control-input'));
    const labelDebugElement = checkDebugElement.query(By.css('label.custom-control-label'));
    const checkElement = <HTMLDivElement>checkDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(checkElement).toBeDefined();
    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('checkbox');
    expect(labelElement).toBeDefined();
    expect(labelElement.htmlFor).toBe(component.inputId);
    expect(labelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('div.custom-control.custom-switch'));
    const inputDebugElement = checkDebugElement.query(By.css('input.custom-control-input'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
