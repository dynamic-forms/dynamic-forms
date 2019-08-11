import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelect } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlDefinition, DynamicFormDefinition, DynamicFormSelect,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormSelectComponent } from './dynamic-form-select.component';
import { DynamicFormSelectModule } from './dynamic-form-select.module';

describe('DynamicFormSelectComponent', () => {
  let fixture: ComponentFixture<DynamicFormSelectComponent>;
  let component: DynamicFormSelectComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormSelect>;
  let formControl: DynamicFormControl<DynamicFormSelect>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormSelectComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormSelect>>{
      key: 'key',
      template: {
        label: 'label',
        input: {
          placeholder: 'placeholder',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
            {
              label: 'group1',
              items: [
                { value: 'value3', label: 'label3' },
                { value: 'value4', label: 'label4' }
              ]
            },
            {
              label: 'group2',
              items: [
                { value: 'value5', label: 'label5' }
              ]
            }
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormSelect>(form, form, definition);

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
    const selectDebugElement = fieldDebugElement.query(By.css('mat-select'));
    const selectComponent = <MatSelect>selectDebugElement.componentInstance;
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const selectElement = <HTMLElement>selectDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;
    const optionElements = selectComponent.options.toArray();
    const optionGroupElements = selectComponent.optionGroups.toArray();

    expect(fieldElement).toBeDefined();
    expect(labelElement.innerText).toBe('label');
    expect(selectElement.id).toBe(component.id);
    expect(optionElements.length).toBe(5);
    expect(optionElements[0].value).toBe('value1');
    expect(optionElements[0].viewValue).toBe('label1');
    expect(optionElements[1].value).toBe('value2');
    expect(optionElements[1].viewValue).toBe('label2');
    expect(optionElements[2].group).toBe(optionGroupElements[0]);
    expect(optionElements[2].value).toBe('value3');
    expect(optionElements[2].viewValue).toBe('label3');
    expect(optionElements[3].group).toBe(optionGroupElements[0]);
    expect(optionElements[3].value).toBe('value4');
    expect(optionElements[3].viewValue).toBe('label4');
    expect(optionElements[4].group).toBe(optionGroupElements[1]);
    expect(optionElements[4].value).toBe('value5');
    expect(optionElements[4].viewValue).toBe('label5');

    expect(optionGroupElements.length).toBe(2);
    expect(optionGroupElements[0].label).toBe('group1');
    expect(optionGroupElements[1].label).toBe('group2');
  });
});
