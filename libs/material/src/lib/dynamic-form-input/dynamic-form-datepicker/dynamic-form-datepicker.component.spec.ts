import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormDatepicker, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';
import { DynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('DynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<DynamicFormDatepickerComponent>;
  let component: DynamicFormDatepickerComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormDatepicker>;
  let formControl: DynamicFormControl<DynamicFormDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDatepickerModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormDatepicker>>{ key: 'key', label: 'label', input: {} };
    formControl = new DynamicFormControl<DynamicFormDatepicker>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formLabelDebugElement = formFieldDebugElement.query(By.css('label.mat-form-field-label'));
    const formInputDebugElement = formFieldDebugElement.query(By.css('input.mat-input-element'));
    const formFieldElement = <HTMLElement>formFieldDebugElement.nativeElement;
    const formLabelElement = <HTMLLabelElement>formLabelDebugElement.nativeElement;
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    expect(formFieldElement).toBeDefined();
    expect(formLabelElement.innerText).toBe('label');
    expect(formInputElement.id).toBe(component.id);
    expect(formInputElement.type).toBe('text');
  });

  it('sets dynamic form control to readonly', () => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formInputDebugElement = formFieldDebugElement.query(By.css('input.mat-input-element'));
    const formFieldElement = <HTMLElement>formFieldDebugElement.nativeElement;
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    expect(formFieldElement.className).not.toContain('readonly');
    expect(formInputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formFieldElement.className).toContain('readonly');
    expect(formInputElement.readOnly).toBe(true);
  });
});
