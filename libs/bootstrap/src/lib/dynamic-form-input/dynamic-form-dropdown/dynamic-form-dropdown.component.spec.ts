import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlDefinition, DynamicFormDefinition,
  DynamicFormDropdown } from '@dynamic-forms/core';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown.component';
import { DynamicFormDropdownModule } from './dynamic-form-dropdown.module';

describe('DynamicFormDropdownComponent', () => {
  let fixture: ComponentFixture<DynamicFormDropdownComponent>;
  let component: DynamicFormDropdownComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormDropdown>;
  let formControl: DynamicFormControl<DynamicFormDropdown>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDropdownModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormDropdownComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormDropdown>>{
      key: 'key',
      template: {
        input: {
          placeholder: 'placeholder',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' }
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormDropdown>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const selectDebugElement = fixture.debugElement.query(By.css('select.form-control'));
    const optionDebugElements = selectDebugElement.queryAll(By.css('option'));
    const selectElement = <HTMLSelectElement>selectDebugElement.nativeElement;
    const optionElements = <HTMLOptionElement[]>optionDebugElements.map(elem => elem.nativeElement);

    expect(selectElement).toBeDefined();
    expect(selectElement.id).toBe(component.id);
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].disabled).toBe(true);
    expect(optionElements[0].hidden).toBe(true);
    expect(optionElements[0].innerText).toBe('placeholder');
    expect(optionElements[1].value).toBe('value1');
    expect(optionElements[1].innerText).toBe('label1');
    expect(optionElements[2].value).toBe('value2');
    expect(optionElements[2].innerText).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const selectDebugElement = fixture.debugElement.query(By.css('select.form-control'));
    const selectElement = <HTMLSelectElement>selectDebugElement.nativeElement;

    expect(selectElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(selectElement.className).toContain('readonly');
  });
});
