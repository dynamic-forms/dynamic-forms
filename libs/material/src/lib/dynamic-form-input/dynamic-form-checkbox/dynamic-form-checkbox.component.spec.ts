import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormCheckbox, DynamicFormConfig, DynamicFormConfigService,
  DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate,
  DynamicFormValidationService } from '@dynamic-forms/core';
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
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormCheckboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormCheckbox>>{ key: 'key', label: 'label' };
    formControl = new DynamicFormControl<DynamicFormCheckbox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const inputDebugElement = checkDebugElement.query(By.css('input.mat-checkbox-input'));
    const labelDebugElement = checkDebugElement.query(By.css('span.mat-checkbox-label'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;
    const labelElement = <HTMLSpanElement>labelDebugElement.nativeElement;

    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe('key-input');
    expect(inputElement.type).toBe('checkbox');
    expect(labelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const checkDebugElement = fixture.debugElement.query(By.css('mat-checkbox'));
    const checkElement = checkDebugElement.nativeElement;

    expect(checkElement.className).not.toContain('readonly');

    component.template.readonly = true;
    fixture.detectChanges();

    expect(checkElement.className).toContain('readonly');
  });
});
