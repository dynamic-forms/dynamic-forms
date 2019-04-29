import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormRadio,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormRadioComponent } from './dynamic-form-radio.component';
import { DynamicFormRadioModule } from './dynamic-form-radio.module';

describe('DynamicFormRadioComponent', () => {
  let fixture: ComponentFixture<DynamicFormRadioComponent>;
  let component: DynamicFormRadioComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormRadio>;
  let formControl: DynamicFormControl<DynamicFormRadio>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormRadioModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormRadioComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormRadio>>{
      key: 'key',
      input: {
        options: [
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' }
        ]
      }
    };
    formControl = new DynamicFormControl<DynamicFormRadio>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formCheckDebugElements = fixture.debugElement.queryAll(By.css('div.form-check'));
    const formInputDebugElements = formCheckDebugElements.map(elem => elem.query(By.css('input.form-check-input')));
    const formLabelDebugElements = formCheckDebugElements.map(elem => elem.query(By.css('label.form-check-label')));
    const formInputElements = <HTMLInputElement[]>formInputDebugElements.map(elem => elem.nativeElement);
    const formLabelElements = <HTMLLabelElement[]>formLabelDebugElements.map(elem => elem.nativeElement);

    expect(formInputElements.length).toBe(2);
    expect(formLabelElements.length).toBe(2);
    expect(formInputElements[0].id).toBe(`key-0`);
    expect(formInputElements[0].type).toBe('radio');
    expect(formLabelElements[0].htmlFor).toBe(`key-0`);
    expect(formLabelElements[0].innerText).toBe('label1');
    expect(formInputElements[1].id).toBe('key-1');
    expect(formInputElements[1].type).toBe('radio');
    expect(formLabelElements[1].htmlFor).toBe(`key-1`);
    expect(formLabelElements[1].innerText).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const formCheckDebugElements = fixture.debugElement.queryAll(By.css('div.form-check'));
    const formInputDebugElements = formCheckDebugElements.map(elem => elem.query(By.css('input.form-check-input')));
    const formCheckElements = <HTMLDivElement[]>formCheckDebugElements.map(elem => elem.nativeElement);
    const formInputElements = <HTMLInputElement[]>formInputDebugElements.map(elem => elem.nativeElement);

    expect(formCheckElements[0].className).not.toContain('readonly');
    expect(formCheckElements[1].className).not.toContain('readonly');
    expect(formInputElements[0].readOnly).not.toBe(true);
    expect(formInputElements[1].readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formCheckElements[0].className).toContain('readonly');
    expect(formCheckElements[1].className).toContain('readonly');
    expect(formInputElements[0].readOnly).toBe(true);
    expect(formInputElements[1].readOnly).toBe(true);
  });
});
