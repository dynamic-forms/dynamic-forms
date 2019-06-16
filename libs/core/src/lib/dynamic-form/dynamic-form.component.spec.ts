import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;
  let template: DynamicFormTemplate;
  let model: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DynamicFormComponent,
        DynamicFormFieldComponent,
        DynamicFormGroupComponent,
        DynamicFormValidationComponent
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'core'
          })
        },
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormValidationBuilder,
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    template = <DynamicFormTemplate>{ fields: [] };
    model = {};

    component.template = template;
    component.model = model;
    component.ngOnChanges({
      template: new SimpleChange(undefined, template, true),
      model: new SimpleChange(undefined, model, true)
    });

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.formField.template).toBe(template);
    expect(component.formField.model).toBe(model);
  });

  it('creates component template', () => {
    const formDebugElement = fixture.debugElement.query(By.css('form'));
    const formElement = <HTMLElement>formDebugElement.nativeElement;
    const formComponent = formDebugElement.componentInstance;
    const formGroupComponent = <DynamicFormGroupComponent>fixture.debugElement
      .query(By.css('dynamic-form-group')).componentInstance;

    expect(formElement.className).toContain('dynamic-form');
    expect(formComponent.formGroup).toBe(component.formGroup);
    expect(formGroupComponent.field).toBe(component.formField);
  });

  it('ngOnChanges creates form field with empty model', () => {
    component.model = null;
    component.ngOnChanges({ model: new SimpleChange(model, undefined, false) });

    expect(component.formField.model).toEqual({});
    expect(component.formField.template).toBe(template);
  });

  it('ngOnChanges creates form field with updated model', () => {
    const modelUpdated = {};

    component.model = modelUpdated;
    component.ngOnChanges({ model: new SimpleChange(model, modelUpdated, false) });

    expect(component.formField.model).toBe(modelUpdated);
    expect(component.formField.template).toBe(template);
  });

  it('ngOnChanges creates form field with updated template', () => {
    const templateUpdated = <DynamicFormTemplate>{ fields: [] };

    component.template = templateUpdated;
    component.ngOnChanges({ model: new SimpleChange(template, templateUpdated, false) });

    expect(component.formField.model).toBe(model);
    expect(component.formField.template).toBe(templateUpdated);
  });

  it('ngOnSubmit emits form submit', () => {
    spyOn(component.formSubmit, 'emit');

    component.ngOnSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      value: component.formGroup.value,
      model: component.model
    });
  });
});
