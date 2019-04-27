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
    });

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
    const formCheckInputDebugElements = formCheckDebugElements.map(elem => elem.query(By.css('input.form-check-input')));
    const formCheckLabelDebugElements = formCheckDebugElements.map(elem => elem.query(By.css('label.form-check-label')));
    const formCheckInputElements = <HTMLInputElement[]>formCheckInputDebugElements.map(elem => elem.nativeElement);
    const formCheckLabelElements = <HTMLLabelElement[]>formCheckLabelDebugElements.map(elem => elem.nativeElement);

    expect(formCheckInputElements.length).toBe(2);
    expect(formCheckInputElements.length).toBe(2);
    expect(formCheckLabelElements.length).toBe(2);
    expect(formCheckInputElements[0].id).toBe(`key-0`);
    expect(formCheckInputElements[0].type).toBe('radio');
    expect(formCheckLabelElements[0].htmlFor).toBe(`key-0`);
    expect(formCheckLabelElements[0].innerHTML).toBe('label1');
    expect(formCheckInputElements[1].id).toBe('key-1');
    expect(formCheckInputElements[1].type).toBe('radio');
    expect(formCheckLabelElements[1].htmlFor).toBe(`key-1`);
    expect(formCheckLabelElements[1].innerHTML).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const formCheckDebugElements = fixture.debugElement.queryAll(By.css('div.form-check'));
    const formCheckInputDebugElements = formCheckDebugElements.map(elem => elem.query(By.css('input.form-check-input')));
    const formCheckElements = <HTMLDivElement[]>formCheckDebugElements.map(elem => elem.nativeElement);
    const formCheckInputElements = <HTMLInputElement[]>formCheckInputDebugElements.map(elem => elem.nativeElement);

    expect(formCheckElements[0].className).not.toContain('readonly');
    expect(formCheckElements[1].className).not.toContain('readonly');
    expect(formCheckInputElements[0].readOnly).not.toBe(true);
    expect(formCheckInputElements[1].readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formCheckElements[0].className).toContain('readonly');
    expect(formCheckElements[1].className).toContain('readonly');
    expect(formCheckInputElements[0].readOnly).toBe(true);
    expect(formCheckInputElements[1].readOnly).toBe(true);
  });
});
