import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormLibraryService, DynamicFormTextbox, DynamicFormValidationService} from '@dynamic-forms/core';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox.component';
import { BsDynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('DynamicFormTextboxComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormTextboxComponent>;
  let component: BsDynamicFormTextboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormTextbox>;
  let formControl: DynamicFormControl<DynamicFormTextbox>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormTextboxModule
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

    fixture = TestBed.createComponent(BsDynamicFormTextboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormTextbox>>{ key: 'key', template: { input: {} } };
    formControl = new DynamicFormControl<DynamicFormTextbox>(form, form, definition);

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
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('text');
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
