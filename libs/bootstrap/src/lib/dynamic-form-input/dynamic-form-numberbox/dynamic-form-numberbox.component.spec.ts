import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormConfigService, DynamicFormDefinition,
  DynamicFormFieldType, DynamicFormLibraryService, DynamicFormNumberboxControl, DynamicFormNumberboxDefinition,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

describe('BsDynamicFormNumberboxComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormNumberboxComponent>;
  let component: BsDynamicFormNumberboxComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormNumberboxDefinition;
  let formControl: DynamicFormNumberboxControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormNumberboxComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { input: {} } } as DynamicFormNumberboxDefinition;
    formControl = new DynamicFormNumberboxControl(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('number');
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
