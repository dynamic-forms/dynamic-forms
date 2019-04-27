import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormDropdown,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown.component';
import { DynamicFormDropdownModule } from './dynamic-form-dropdown.module';

describe('DynamicFormDropdownComponent', () => {
  let fixture: ComponentFixture<DynamicFormDropdownComponent>;
  let component: DynamicFormDropdownComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormDropdown>;
  let formControl: DynamicFormControl<DynamicFormDropdown>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDropdownModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormDropdownComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormDropdown>>{
      key: 'key',
      input: {
        placeholder: 'placeholder',
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' }
        ]
      }
    };
    formControl = new DynamicFormControl<DynamicFormDropdown>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formSelectDebugElement = fixture.debugElement.query(By.css('select.form-control'));
    const formOptionDebugElements = formSelectDebugElement.queryAll(By.css('option'));
    const formSelectElement = <HTMLSelectElement>formSelectDebugElement.nativeElement;
    const formOptionElements = <HTMLOptionElement[]>formOptionDebugElements.map(elem => elem.nativeElement);

    expect(formSelectElement).toBeDefined();
    expect(formSelectElement.id).toBe(component.id);
    expect(formOptionElements.length).toBe(3);
    expect(formOptionElements[0].disabled).toBe(true);
    expect(formOptionElements[0].hidden).toBe(true);
    expect(formOptionElements[0].innerHTML).toBe('placeholder');
    expect(formOptionElements[1].value).toBe('value1');
    expect(formOptionElements[1].innerHTML).toBe('label1');
    expect(formOptionElements[2].value).toBe('value2');
    expect(formOptionElements[2].innerHTML).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const formSelectDebugElement = fixture.debugElement.query(By.css('select.form-control'));
    const formSelectElement = <HTMLSelectElement>formSelectDebugElement.nativeElement;

    expect(formSelectElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formSelectElement.className).toContain('readonly');
  });
});
