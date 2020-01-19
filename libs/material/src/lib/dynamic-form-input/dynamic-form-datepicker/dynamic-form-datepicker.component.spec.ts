import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDatepicker, DynamicFormDefinition, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';
import { MatDynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('MatDynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormDatepickerComponent>;
  let component: MatDynamicFormDatepickerComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormDatepicker>;
  let formControl: DynamicFormControl<DynamicFormDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormDatepickerModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ name: 'test' })
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormDatepicker>>{ key: 'key', template: { label: 'label', input: {} } };
    formControl = new DynamicFormControl<DynamicFormDatepicker>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(fieldElement).toBeDefined();
    expect(labelElement.innerText).toBe('label');
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('text');
  });

  it('sets dynamic form control to readonly', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
