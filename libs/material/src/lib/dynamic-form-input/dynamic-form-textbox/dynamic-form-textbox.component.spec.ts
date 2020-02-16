import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormTextbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormTextboxComponent } from './dynamic-form-textbox.component';
import { MatDynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('MatDynamicFormTextboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormTextboxComponent>;
  let component: MatDynamicFormTextboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormTextbox>;
  let formControl: DynamicFormControl<DynamicFormTextbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTextboxModule,
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

    fixture = TestBed.createComponent(MatDynamicFormTextboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormTextbox>>{ key: 'key', template: { label: 'label', input: {} } };
    formControl = new DynamicFormControl<DynamicFormTextbox>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('creates component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(fieldElement).toBeDefined();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('text');
    expect(labelElement.innerText).toBe('label');
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
