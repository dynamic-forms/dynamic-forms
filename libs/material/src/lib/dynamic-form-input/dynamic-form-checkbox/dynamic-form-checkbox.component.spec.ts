import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormCheckbox, DynamicFormControl, DynamicFormControlTemplate,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';
import { DynamicFormCheckboxModule } from './dynamic-form-checkbox.module';

describe('DynamicFormCheckboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormCheckboxComponent>;
  let component: DynamicFormCheckboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormCheckbox>;
  let formControl: DynamicFormControl<DynamicFormCheckbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormCheckboxModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormCheckbox>>{ key: 'key', label: 'label' };
    formControl = new DynamicFormControl<DynamicFormCheckbox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formCheckDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const formInputDebugElement = formCheckDebugElement.query(By.css('input.mat-checkbox-input'));
    const formLabelDebugElement = formCheckDebugElement.query(By.css('span.mat-checkbox-label'));
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;
    const formLabelElement = <HTMLSpanElement>formLabelDebugElement.nativeElement;

    expect(formInputElement).toBeDefined();
    expect(formInputElement.id).toBe('key-input');
    expect(formInputElement.type).toBe('checkbox');
    expect(formLabelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const formCheckDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const formCheckElement = formCheckDebugElement.nativeElement;

    expect(formCheckElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formCheckElement.className).toContain('readonly');
  });
});
