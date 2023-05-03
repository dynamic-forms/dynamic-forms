import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelect } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormBuilder, DynamicFormConfigService, DynamicFormDefinition,
  DynamicFormFieldType, DynamicFormLibraryService, DynamicFormSelectControl, DynamicFormSelectDefinition,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormSelectComponent } from './dynamic-form-select.component';

describe('MatDynamicFormSelectComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormSelectComponent>;
  let component: MatDynamicFormSelectComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormSelectDefinition;
  let formControl: DynamicFormSelectControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDynamicFormSelectComponent,
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

    fixture = TestBed.createComponent(MatDynamicFormSelectComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = {
      key: 'key',
      template: {
        label: 'label',
        input: {
          placeholder: 'placeholder',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
            { value: 'value3', label: 'label3', disabled: true },
            {
              label: 'group1',
              items: [
                { value: 'value4', label: 'label4' },
                { value: 'value5', label: 'label5' },
                { value: 'value6', label: 'label6', disabled: true },
              ],
            },
            {
              label: 'group2',
              items: [
                { value: 'value7', label: 'label7' },
                { value: 'value8', label: 'label8' },
                { value: 'value9', label: 'label9', disabled: true },
              ],
              disabled: true,
            },
          ],
        },
      },
    } as DynamicFormSelectDefinition;
    formControl = new DynamicFormSelectControl(builder, form, form, definition, {} as DynamicFormFieldType);

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
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const labelDebugElement = fieldDebugElement.query(By.css('label'));
    const selectDebugElement = fieldDebugElement.query(By.css('mat-select'));
    const selectComponent = selectDebugElement.componentInstance as MatSelect;
    const fieldElement = fieldDebugElement.nativeElement as HTMLElement;
    const selectElement = selectDebugElement.nativeElement as HTMLElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;
    const optionElements = selectComponent.options.toArray();
    const optionGroupElements = selectComponent.optionGroups.toArray();

    expect(fieldElement).toBeTruthy();
    expect(labelElement.innerText).toBe('label');
    expect(selectElement.id).toBe(component.inputId);
    expect(optionElements.length).toBe(9);
    expect(optionElements[0].value).toBe('value1');
    expect(optionElements[0].disabled).toBe(false);
    expect(optionElements[0].viewValue).toBe('label1');
    expect(optionElements[1].value).toBe('value2');
    expect(optionElements[1].disabled).toBe(false);
    expect(optionElements[1].viewValue).toBe('label2');
    expect(optionElements[2].value).toBe('value3');
    expect(optionElements[2].disabled).toBe(true);
    expect(optionElements[2].viewValue).toBe('label3');
    expect(optionElements[3].group).toBe(optionGroupElements[0]);
    expect(optionElements[3].value).toBe('value4');
    expect(optionElements[3].disabled).toBe(false);
    expect(optionElements[3].viewValue).toBe('label4');
    expect(optionElements[4].group).toBe(optionGroupElements[0]);
    expect(optionElements[4].value).toBe('value5');
    expect(optionElements[4].disabled).toBe(false);
    expect(optionElements[4].viewValue).toBe('label5');
    expect(optionElements[5].group).toBe(optionGroupElements[0]);
    expect(optionElements[5].value).toBe('value6');
    expect(optionElements[5].disabled).toBe(true);
    expect(optionElements[5].viewValue).toBe('label6');
    expect(optionElements[6].group).toBe(optionGroupElements[1]);
    expect(optionElements[6].value).toBe('value7');
    expect(optionElements[6].disabled).toBe(true);
    expect(optionElements[6].viewValue).toBe('label7');
    expect(optionElements[7].group).toBe(optionGroupElements[1]);
    expect(optionElements[7].value).toBe('value8');
    expect(optionElements[7].disabled).toBe(true);
    expect(optionElements[7].viewValue).toBe('label8');
    expect(optionElements[8].group).toBe(optionGroupElements[1]);
    expect(optionElements[8].value).toBe('value9');
    expect(optionElements[8].disabled).toBe(true);
    expect(optionElements[8].viewValue).toBe('label9');

    expect(optionGroupElements.length).toBe(2);
    expect(optionGroupElements[0].label).toBe('group1');
    expect(optionGroupElements[0].disabled).toBe(false);
    expect(optionGroupElements[1].label).toBe('group2');
    expect(optionGroupElements[1].disabled).toBe(true);
  });
});
