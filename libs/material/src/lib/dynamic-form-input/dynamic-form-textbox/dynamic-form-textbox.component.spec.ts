import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormTemplate, DynamicFormTextbox } from '@dynamic-forms/core';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox.component';
import { DynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('DynamicFormTextboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormTextboxComponent>;
  let component: DynamicFormTextboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormTextbox>;
  let formControl: DynamicFormControl<DynamicFormTextbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextboxModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTextboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormTextbox>>{ key: 'key', label: 'label', input: {} };
    formControl = new DynamicFormControl<DynamicFormTextbox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formInputDebugElement = formFieldDebugElement.query(By.css('input.mat-input-element'));
    const formLabelDebugElement = formFieldDebugElement.query(By.css('label.mat-form-field-label'));
    const formFieldElement = <HTMLElement>formFieldDebugElement.nativeElement;
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;
    const formLabelElement = <HTMLLabelElement>formLabelDebugElement.nativeElement;

    expect(formFieldElement).toBeDefined();
    expect(formInputElement.id).toBe(component.id);
    expect(formInputElement.type).toBe('text');
    expect(formLabelElement.innerText).toBe('label');
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
