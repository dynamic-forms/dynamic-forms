import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormCheckboxControl, DynamicFormCheckboxDefinition,
  DynamicFormConfigService, DynamicFormDefinition, DynamicFormLibraryService,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';
import { MatDynamicFormCheckboxModule } from './dynamic-form-checkbox.module';

describe('MatDynamicFormCheckboxComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormCheckboxComponent>;
  let component: MatDynamicFormCheckboxComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormCheckboxDefinition;
  let formControl: DynamicFormCheckboxControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormCheckboxModule,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label' } } as DynamicFormCheckboxDefinition;
    formControl = new DynamicFormCheckboxControl(builder, form, form, definition);

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
    const checkDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const inputDebugElement = checkDebugElement.query(By.css('input'));
    const labelDebugElement = checkDebugElement.query(By.css('label'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe('key-input');
    expect(inputElement.type).toBe('checkbox');
    expect(labelElement.innerText).toBe('label');
  });
});
