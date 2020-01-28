import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
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
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ name: 'test' })
        },
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormEvaluationBuilder,
        DynamicFormValidationBuilder,
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
    expect(component.formField.definition).toBe(definition);
    expect(component.formField.model).toBe(model);
  });

  it('creates component template', () => {
    const formWrapperDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-wrapper'));
    const formDebugElement = formWrapperDebugElement.query(By.css('form.dynamic-form'));
    const formComponent = formDebugElement.componentInstance;

    expect(formComponent.formGroup).toBe(component.formGroup);
  });

  it('sets class name of dynamic form wrapper', () => {
    const formWrapperDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-wrapper'));
    const formWrapperElement = <HTMLElement>formWrapperDebugElement.nativeElement;

    expect(formWrapperElement.className).toBe('dynamic-form-wrapper');

    component.template.wrapperClassName = 'className1 className2';
    fixture.detectChanges();

    expect(formWrapperElement.className).toBe('dynamic-form-wrapper className1 className2');

    component.template.wrapperClassName = null;
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

    expect(component.formField.model).toEqual({});
    expect(component.formField.definition).toBe(definition);
  });

  it('ngOnChanges creates form field with updated model', () => {
    const modelUpdated = {};

    component.model = modelUpdated;
    component.ngOnChanges({ model: new SimpleChange(model, modelUpdated, false) });

    expect(component.formField.model).toBe(modelUpdated);
    expect(component.formField.definition).toBe(definition);
  });

  it('ngOnChanges creates form field with updated definition', () => {
    const definitionUpdated = <DynamicFormDefinition>{ elements: [] };

    component.definition = definitionUpdated;
    component.ngOnChanges({ definition: new SimpleChange(definition, definitionUpdated, false) });

    expect(component.formField.model).toBe(model);
    expect(component.formField.definition).toBe(definitionUpdated);
  });

  it('ngOnSubmit emits form submit', () => {
    spyOn(component.formSubmit, 'emit');

    component.ngOnSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      value: component.formGroup.value,
      model: component.model
    });
  });

  it('reset calls reset of form field', () => {
    spyOn(component.formField, 'reset');

    component.reset();

    expect(component.formField.reset).toHaveBeenCalled();
  });

  it('resetDefault calls resetDefault of form field', () => {
    spyOn(component.formField, 'resetDefault');

    component.resetDefault();

    expect(component.formField.resetDefault).toHaveBeenCalled();
  });

  it('validate calls validate of form field', () => {
    spyOn(component.formField, 'validate');

    component.validate();

    expect(component.formField.validate).toHaveBeenCalled();
  });
});
