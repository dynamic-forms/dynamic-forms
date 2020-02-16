import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormCombobox, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';
import { BsDynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('BsDynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormComboboxComponent>;
  let component: BsDynamicFormComboboxComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormCombobox>;
  let formControl: DynamicFormControl<DynamicFormCombobox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormComboboxModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ name: 'test' })
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormComboboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormCombobox>>{
      key: 'key',
      template: {
        label: 'label',
        input: {
          options: [
            'Value1',
            'Value2',
            'Value3'
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormCombobox>(form, form, definition);

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
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputListDebugElement = fixture.debugElement.query(By.css('datalist'));
    const inputListItemDebugElements = inputListDebugElement.queryAll(By.css('option'));

    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const inputListElement = <HTMLDataListElement>inputListDebugElement.nativeElement;
    const inputListItemElements = <HTMLOptionElement[]>inputListItemDebugElements.map(elem => elem.nativeElement);

    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe(component.inputId);
    expect(inputElement.type).toBe('text');
    expect(inputElement.list).toBe(inputListElement);
    expect(inputListElement.id).toBe('list');
    expect(inputListItemElements.length).toBe(3);
    expect(inputListItemElements[0].value).toBe('Value1');
    expect(inputListItemElements[0].innerText).toBe('Value1');
    expect(inputListItemElements[1].value).toBe('Value2');
    expect(inputListItemElements[1].innerText).toBe('Value2');
    expect(inputListItemElements[2].value).toBe('Value3');
    expect(inputListItemElements[2].innerText).toBe('Value3');
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
