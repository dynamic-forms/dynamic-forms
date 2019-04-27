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
    });

    fixture = TestBed.createComponent(DynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormCheckbox>>{ key: 'key' };
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
    const formCheckElement = formCheckDebugElement.nativeElement;

    expect(formCheckElement).toBeDefined();
  });

  it('sets dynamic form control to readonly', () => {
    const formCheckDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const formCheckElement = formCheckDebugElement.nativeElement;

    expect(formCheckElement.className).not.toContain('readonly');
    // expect(formCheckInputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formCheckElement.className).toContain('readonly');
    // expect(formCheckInputElement.readOnly).toBe(true);
  });
});
