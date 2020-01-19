import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormNumberbox, DynamicFormValidationService} from '@dynamic-forms/core';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';
import { BsDynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('BsDynamicFormNumberboxComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormNumberboxComponent>;
  let component: BsDynamicFormNumberboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormNumberbox>;
  let formControl: DynamicFormControl<DynamicFormNumberbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormNumberboxModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ name: 'test' })
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormNumberbox>>{ key: 'key', template: { input: {} } };
    formControl = new DynamicFormControl<DynamicFormNumberbox>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('number');
  });

  it('sets dynamic form control to readonly', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
