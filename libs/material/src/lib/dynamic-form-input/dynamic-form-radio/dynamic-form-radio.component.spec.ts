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
    const formGroupDebugElement = fixture.debugElement.query(By.css('mat-radio-group'));
    const formInputDebugElements = formGroupDebugElement.queryAll(By.css('input.mat-radio-input'));
    const formLabelDebugElements = formGroupDebugElement.queryAll(By.css('div.mat-radio-label-content'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;
    const formInputElements = <HTMLInputElement[]>formInputDebugElements.map(elem => elem.nativeElement);
    const formLabelElements = <HTMLLabelElement[]>formLabelDebugElements.map(elem => elem.nativeElement);

    expect(formGroupElement).toBeDefined();
    expect(formInputElements[0].id).toBe(`key-0-input`);
    expect(formInputElements[0].type).toBe('radio');
    // expect(formLabelElements[0].htmlFor).toBe(`key-0`);
    expect(formLabelElements[0].innerText).toBe('label1');
    expect(formInputElements[1].id).toBe('key-1-input');
    expect(formInputElements[1].type).toBe('radio');
    // expect(formLabelElements[1].htmlFor).toBe(`key-1`);
    expect(formLabelElements[1].innerText).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const formGroupDebugElement = fixture.debugElement.query(By.css('mat-radio-group'));
    const formGroupElement = <HTMLElement>formGroupDebugElement.nativeElement;

    expect(formGroupElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formGroupElement.className).toContain('readonly');
  });
});
