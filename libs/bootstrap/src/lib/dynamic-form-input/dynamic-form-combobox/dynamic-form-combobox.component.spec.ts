import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormCombobox, DynamicFormControl, DynamicFormControlTemplate,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormComboboxComponent } from './dynamic-form-combobox.component';
import { DynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('DynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormComboboxComponent>;
  let component: DynamicFormComboboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormCombobox>;
  let formControl: DynamicFormControl<DynamicFormCombobox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComboboxModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComboboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormCombobox>>{ key: 'key', input: {} };
    formControl = new DynamicFormControl<DynamicFormCombobox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formInputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    expect(formInputElement).toBeDefined();
    expect(formInputElement.id).toBe(component.id);
    expect(formInputElement.type).toBe('text');
  });

  it('sets dynamic form control to readonly', () => {
    const formInputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    expect(formInputElement.className).not.toContain('readonly');
    expect(formInputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formInputElement.className).toContain('readonly');
    expect(formInputElement.readOnly).toBe(true);
  });
});
