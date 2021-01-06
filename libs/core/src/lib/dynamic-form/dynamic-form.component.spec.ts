import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormBuilder } from './dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormModule } from './dynamic-form.module';

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;
  let definition: DynamicFormDefinition;
  let model: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormConfigService,
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        {
          provide: DynamicFormEvaluationBuilder,
          useValue: {}
        },
        {
          provide: DynamicFormValidationBuilder,
          useValue: {
            createGroupValidators: () => []
          }
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    definition = <DynamicFormDefinition>{ elements: [] };
    model = {};

    component.definition = definition;
    component.model = model;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.form.definition).toBe(definition);
    expect(component.form.model).toBe(model);
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
    const formWrapperElement = <HTMLElement>formWrapperDebugElement.nativeElement;

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
    const formElement = <HTMLElement>formDebugElement.nativeElement;

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

  it('ngOnChanges creates form field with updated model', () => {
    const modelUpdated = {};

    component.model = modelUpdated;
    component.ngOnChanges({ model: new SimpleChange(model, modelUpdated, false) });

    expect(component.form.model).toBe(modelUpdated);
    expect(component.form.definition).toBe(definition);
  });

  it('ngOnChanges creates form field with updated definition', () => {
    const definitionUpdated = <DynamicFormDefinition>{ elements: [] };

    component.definition = definitionUpdated;
    component.ngOnChanges({ definition: new SimpleChange(definition, definitionUpdated, false) });

    expect(component.form.model).toBe(model);
    expect(component.form.definition).toBe(definitionUpdated);
  });

  it('ngOnSubmit emits form submit', () => {
    spyOn(component.formSubmit, 'emit');

    component.submit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      value: component.formGroup.value,
      model: component.model
    });
  });

  it('form submit emits form submit', () => {
    spyOn(component.formSubmit, 'emit');

    component.form.submit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      value: component.formGroup.value,
      model: component.model
    });
  });

  it('reset calls reset of form field', () => {
    spyOn(component.form, 'reset');

    component.reset();

    expect(component.form.reset).toHaveBeenCalled();
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
