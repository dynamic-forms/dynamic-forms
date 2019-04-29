import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormNumberbox, DynamicFormTemplate } from '@dynamic-forms/core';
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
        DynamicFormNumberboxModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormNumberbox>>{ key: 'key', label: 'label', input: {} };
    formControl = new DynamicFormControl<DynamicFormNumberbox>(form, form, template);

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
    expect(formInputElement.type).toBe('number');
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
