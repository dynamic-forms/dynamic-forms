import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormLogger } from '../dynamic-form-error/dynamic-form.logger';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormFileUpload } from '../dynamic-form-input/dynamic-form-file/dynamic-form-file';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormBuilder } from './dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;
  let definition: DynamicFormDefinition;
  let model: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComponent,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormExpressionBuilder,
        {
          provide: DynamicFormEvaluationBuilder,
          useValue: {},
        },
        {
          provide: DynamicFormValidationBuilder,
          useValue: {
            createGroupValidators: () => [],
          },
        },
        DynamicFormValidationService,
        DynamicFormErrorHandler,
        DynamicFormLogger,
        DynamicFormBuilder,
      ],
    });

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    definition = { children: [] } as DynamicFormDefinition;
    model = {};

    component.definition = definition;
    component.model = model;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBe(component.form.value);
    expect(component.form.definition).toBe(definition);
    expect(component.form.model).toBe(model);
    expect(component.formGroup).toBe(component.form.control);
    expect(component.template).toEqual({});
    expect(component.template).toBe(definition.template);
  });

  it('renders component template', () => {
    const formWrapperDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-wrapper'));
    const formDebugElement = formWrapperDebugElement.query(By.css('form.dynamic-form'));
    const formComponent = formDebugElement.componentInstance;

    expect(formComponent.formGroup).toBe(component.formGroup);
  });

  it('renders component template with errors', () => {
    component.formGroup.setErrors({});
    component.formGroup.markAsTouched();

    expect(component.hasErrors).toBe(true);
    expect(component.showErrors).toBe(true);

    fixture.detectChanges();

    const formErrorsDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-errors'));

    expect(formErrorsDebugElement).toBeTruthy();
  });

  it('sets class name of dynamic form wrapper', () => {
    const formWrapperDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-wrapper'));
    const formWrapperElement = formWrapperDebugElement.nativeElement as HTMLElement;

    expect(formWrapperElement.className).toBe('dynamic-form-wrapper');

    component.theme = 'theme';
    fixture.detectChanges();

    expect(formWrapperElement.className).toBe('dynamic-form-wrapper theme');

    component.theme = null;
    fixture.detectChanges();

    expect(formWrapperElement.className).toBe('dynamic-form-wrapper');
  });

  it('sets class name of dynamic form', () => {
    const formWrapperDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-wrapper'));
    const formDebugElement = formWrapperDebugElement.query(By.css('form.dynamic-form'));
    const formElement = formDebugElement.nativeElement as HTMLElement;

    expect(formElement.className).toBe('dynamic-form ng-untouched ng-pristine ng-valid');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formElement.className).toBe('dynamic-form ng-untouched ng-pristine ng-valid className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formElement.className).toBe('dynamic-form ng-untouched ng-pristine ng-valid');
  });

  it('ngOnChanges creates form field with empty model', () => {
    component.model = null;
    component.ngOnChanges({ model: new SimpleChange(model, undefined, false) });

    expect(component.form.model).toEqual({});
    expect(component.form.definition).toBe(definition);
  });

  it('ngOnChanges creates form with changed model', () => {
    const form = component.form;
    const formGroup = component.formGroup;
    const modelChanged = {};

    component.model = modelChanged;
    component.ngOnChanges({ model: new SimpleChange(model, modelChanged, false) });

    expect(component.form).not.toBe(form);
    expect(component.formGroup).not.toBe(formGroup);
    expect(component.form.model).toBe(modelChanged);
    expect(component.form.definition).toBe(definition);
  });

  it('ngOnChanges creates form with changed definition', () => {
    const form = component.form;
    const formGroup = component.formGroup;
    const definitionUpdated = { children: [] } as DynamicFormDefinition;

    component.definition = definitionUpdated;
    component.ngOnChanges({ definition: new SimpleChange(definition, definitionUpdated, false) });

    expect(component.form).not.toBe(form);
    expect(component.formGroup).not.toBe(formGroup);
    expect(component.form.model).toBe(model);
    expect(component.form.definition).toBe(definitionUpdated);
  });

  it('ngOnChanges creates form with changed model and definition', () => {
    const form = component.form;
    const formGroup = component.formGroup;
    const modelChanged = {};
    const definitionChanged = { children: [] } as DynamicFormDefinition;

    component.model = modelChanged;
    component.definition = definitionChanged;
    component.ngOnChanges({
      model: new SimpleChange(model, modelChanged, false),
      definition: new SimpleChange(definition, definitionChanged, false),
    });

    expect(component.form).not.toBe(form);
    expect(component.formGroup).not.toBe(formGroup);
    expect(component.form.model).toBe(modelChanged);
    expect(component.form.definition).toBe(definitionChanged);
  });

  it('ngOnChanges does not create form with unchanged model and definition', () => {
    const form = component.form;
    const formGroup = component.formGroup;

    component.ngOnChanges({});

    expect(component.form).toBe(form);
    expect(component.formGroup).toBe(formGroup);
    expect(component.form.model).toBe(model);
    expect(component.form.definition).toBe(definition);
  });

  it('ngOnSubmit emits form submit', () => {
    spyOn(component.formSubmit, 'emit');

    component.submit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      value: component.value,
      model: component.model,
      files: undefined,
    });
  });

  it('form submit emits form submit with files', () => {
    spyOn(component.formSubmit, 'emit');

    const file = new File([''], 'file01.txt', { type: 'text/plain' });

    component.formGroup.addControl('fileUpload', new FormControl(new DynamicFormFileUpload(file)));

    component.form.submit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      value: component.value,
      model: component.model,
      files: jasmine.any(FormData),
    });
  });

  it('form group value changes emits value change', () => {
    spyOn(component.valueChange, 'emit');

    component.formGroup.patchValue({});

    expect(component.valueChange.emit).toHaveBeenCalledWith({});
  });

  it('reset calls reset of form field', () => {
    spyOn(component.form, 'reset');

    component.reset();

    expect(component.form.reset).toHaveBeenCalled();
  });

  it('resetEmpty calls resetEmpty of form field', () => {
    spyOn(component.form, 'resetEmpty');

    component.resetEmpty();

    expect(component.form.resetEmpty).toHaveBeenCalled();
  });

  it('resetDefault calls resetDefault of form field', () => {
    spyOn(component.form, 'resetDefault');

    component.resetDefault();

    expect(component.form.resetDefault).toHaveBeenCalled();
  });

  it('validate calls validate of form field', () => {
    spyOn(component.form, 'validate');

    component.validate();

    expect(component.form.validate).toHaveBeenCalled();
  });
});
