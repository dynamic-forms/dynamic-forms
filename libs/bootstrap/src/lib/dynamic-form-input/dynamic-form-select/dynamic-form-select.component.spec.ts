import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormSelectControl,
  DynamicFormSelectDefinition,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { BsDynamicFormSelectComponent } from './dynamic-form-select.component';

describe('BsDynamicFormSelectComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormSelectComponent>;
  let component: BsDynamicFormSelectComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormSelectDefinition;
  let formControl: DynamicFormSelectControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormSelectComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormSelectComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = {
      key: 'key',
      template: {
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
    const selectDebugElement = fixture.debugElement.query(By.css('select.form-select'));
    const optionDebugElements = selectDebugElement.queryAll(By.css('option'));
    const optionGroupDebugElements = selectDebugElement.queryAll(By.css('optgroup'));

    const selectElement = selectDebugElement.nativeElement as HTMLSelectElement;
    const optionElements = optionDebugElements.map(elem => elem.nativeElement) as HTMLOptionElement[];
    const optionGroups = optionGroupDebugElements.map(elem => {
      return {
        groupElement: elem.nativeElement as HTMLOptGroupElement,
        optionElements: elem.queryAll(By.css('option')).map(e => e.nativeElement) as HTMLOptionElement[],
      };
    });

    expect(selectElement).toBeTruthy();
    expect(selectElement.id).toBe(component.inputId);
    expect(optionElements.length).toBe(10);
    expect(optionElements[0].hidden).toBe(true);
    expect(optionElements[0].disabled).toBe(false);
    expect(optionElements[0].innerText).toBe('placeholder');
    expect(optionElements[1].value).toBe('value1');
    expect(optionElements[1].disabled).toBe(false);
    expect(optionElements[1].innerText).toBe('label1');
    expect(optionElements[2].value).toBe('value2');
    expect(optionElements[2].disabled).toBe(false);
    expect(optionElements[2].innerText).toBe('label2');
    expect(optionElements[3].value).toBe('value3');
    expect(optionElements[3].disabled).toBe(true);
    expect(optionElements[3].innerText).toBe('label3');

    expect(optionGroups.length).toBe(2);
    expect(optionGroups[0].groupElement.label).toBe('group1');
    expect(optionGroups[0].groupElement.disabled).toBe(false);
    expect(optionGroups[0].optionElements.length).toBe(3);
    expect(optionGroups[0].optionElements[0]).toBe(optionElements[4]);
    expect(optionGroups[0].optionElements[0].value).toBe('value4');
    expect(optionGroups[0].optionElements[0].disabled).toBe(false);
    expect(optionGroups[0].optionElements[0].innerText).toBe('label4');
    expect(optionGroups[0].optionElements[1]).toBe(optionElements[5]);
    expect(optionGroups[0].optionElements[1].value).toBe('value5');
    expect(optionGroups[0].optionElements[1].disabled).toBe(false);
    expect(optionGroups[0].optionElements[1].innerText).toBe('label5');
    expect(optionGroups[0].optionElements[2]).toBe(optionElements[6]);
    expect(optionGroups[0].optionElements[2].value).toBe('value6');
    expect(optionGroups[0].optionElements[2].disabled).toBe(true);
    expect(optionGroups[0].optionElements[2].innerText).toBe('label6');
    expect(optionGroups[1].groupElement.label).toBe('group2');
    expect(optionGroups[1].groupElement.disabled).toBe(true);
    expect(optionGroups[1].optionElements.length).toBe(3);
    expect(optionGroups[1].optionElements[0]).toBe(optionElements[7]);
    expect(optionGroups[1].optionElements[0].value).toBe('value7');
    expect(optionGroups[1].optionElements[0].disabled).toBe(false);
    expect(optionGroups[1].optionElements[0].innerText).toBe('label7');
    expect(optionGroups[1].optionElements[1]).toBe(optionElements[8]);
    expect(optionGroups[1].optionElements[1].value).toBe('value8');
    expect(optionGroups[1].optionElements[1].disabled).toBe(false);
    expect(optionGroups[1].optionElements[1].innerText).toBe('label8');
    expect(optionGroups[1].optionElements[2]).toBe(optionElements[9]);
    expect(optionGroups[1].optionElements[2].value).toBe('value9');
    expect(optionGroups[1].optionElements[2].disabled).toBe(true);
    expect(optionGroups[1].optionElements[2].innerText).toBe('label9');
  });
});
