import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormCombobox, DynamicFormConfig, DynamicFormConfigService,
  DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormComboboxComponent } from './dynamic-form-combobox.component';
import { DynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('DynamicFormComboboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormComboboxComponent>;
  let component: DynamicFormComboboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormCombobox>;
  let formControl: DynamicFormControl<DynamicFormCombobox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComboboxModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComboboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormCombobox>>{
      key: 'key',
      label: 'label',
      input: {
        options: [
          'Value1',
          'Value2',
          'Value3'
        ]
      }
    };
    formControl = new DynamicFormControl<DynamicFormCombobox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
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

    fixture.whenStable().then(() => {
      expect(formFieldElement.className).toContain('readonly');
      expect(formInputElement.readOnly).toBe(true);
    });
  });

  it('updates value', async(() => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formInputDebugElement = formFieldDebugElement.query(By.css('input.mat-input-element'));
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    formInputElement.value = 'Value1';
    formInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(formInputElement.value).toBe('Value1');
    });
  }));
});
