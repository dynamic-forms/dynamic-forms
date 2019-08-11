import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlDefinition, DynamicFormDefinition,
  DynamicFormRadio } from '@dynamic-forms/core';
import { DynamicFormRadioComponent } from './dynamic-form-radio.component';
import { DynamicFormRadioModule } from './dynamic-form-radio.module';

describe('DynamicFormRadioComponent', () => {
  let fixture: ComponentFixture<DynamicFormRadioComponent>;
  let component: DynamicFormRadioComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormRadio>;
  let formControl: DynamicFormControl<DynamicFormRadio>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormRadioModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormRadioComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormRadio>>{
      key: 'key',
      template: {
        input: {
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' }
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormRadio>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const checkDebugElements = fixture.debugElement.queryAll(By.css('div.form-check'));
    const inputDebugElements = checkDebugElements.map(elem => elem.query(By.css('input.form-check-input')));
    const labelDebugElements = checkDebugElements.map(elem => elem.query(By.css('label.form-check-label')));
    const inputElements = <HTMLInputElement[]>inputDebugElements.map(elem => elem.nativeElement);
    const labelElements = <HTMLLabelElement[]>labelDebugElements.map(elem => elem.nativeElement);

    expect(inputElements.length).toBe(2);
    expect(labelElements.length).toBe(2);
    expect(inputElements[0].id).toBe(`key-0`);
    expect(inputElements[0].type).toBe('radio');
    expect(labelElements[0].htmlFor).toBe(`key-0`);
    expect(labelElements[0].innerText).toBe('label1');
    expect(inputElements[1].id).toBe('key-1');
    expect(inputElements[1].type).toBe('radio');
    expect(labelElements[1].htmlFor).toBe(`key-1`);
    expect(labelElements[1].innerText).toBe('label2');
  });

  it('sets dynamic form control to readonly', () => {
    const checkDebugElements = fixture.debugElement.queryAll(By.css('div.form-check'));
    const inputDebugElements = checkDebugElements.map(elem => elem.query(By.css('input.form-check-input')));
    const inputElements = <HTMLInputElement[]>inputDebugElements.map(elem => elem.nativeElement);

    expect(inputElements[0].readOnly).not.toBe(true);
    expect(inputElements[1].readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElements[0].readOnly).toBe(true);
    expect(inputElements[1].readOnly).toBe(true);
  });
});
