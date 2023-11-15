import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormSwitchControl,
  DynamicFormSwitchDefinition,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MatDynamicFormSwitchComponent } from './dynamic-form-switch.component';

describe('MatDynamicFormSwitchComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormSwitchComponent>;
  let component: MatDynamicFormSwitchComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormSwitchDefinition;
  let formControl: DynamicFormSwitchControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDynamicFormSwitchComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormSwitchComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label' } } as DynamicFormSwitchDefinition;
    formControl = new DynamicFormSwitchControl(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const checkDebugElement = fixture.debugElement.query(By.css('mat-slide-toggle'));
    const buttonDebugElement = checkDebugElement.query(By.css('button'));
    const labelDebugElement = checkDebugElement.query(By.css('label'));
    const buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(buttonElement).toBeTruthy();
    expect(buttonElement.id).toBe('key-button');
    expect(buttonElement.type).toBe('button');
    expect(labelElement.innerText).toBe('label');
  });
});
