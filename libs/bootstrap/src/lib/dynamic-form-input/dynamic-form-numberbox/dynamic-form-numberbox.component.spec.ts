import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormNumberbox,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';
import { DynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('DynamicFormNumberboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormNumberboxComponent>;
  let component: DynamicFormNumberboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormNumberbox>;
  let formControl: DynamicFormControl<DynamicFormNumberbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormNumberboxModule
      ]
    }).compileComponents(); ;

    fixture = TestBed.createComponent(DynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormNumberbox>>{ key: 'key', input: {} };
    formControl = new DynamicFormControl<DynamicFormNumberbox>(form, form, template);

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
    expect(formInputElement.type).toBe('number');
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
