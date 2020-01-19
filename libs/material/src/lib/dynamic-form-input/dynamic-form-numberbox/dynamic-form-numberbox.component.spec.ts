import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormNumberbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';
import { MatDynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('MatDynamicFormNumberboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormNumberboxComponent>;
  let component: MatDynamicFormNumberboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormNumberbox>;
  let formControl: DynamicFormControl<DynamicFormNumberbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormNumberboxModule,
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

    fixture = TestBed.createComponent(MatDynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormNumberbox>>{ key: 'key', template: { label: 'label', input: {} } };
    formControl = new DynamicFormControl<DynamicFormNumberbox>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const inputDebugElement = fieldDebugElement.query(By.css('input.mat-input-element'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(fieldElement).toBeDefined();
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('number');
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
