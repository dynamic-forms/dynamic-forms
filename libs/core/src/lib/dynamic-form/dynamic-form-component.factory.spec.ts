import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormActionBase } from '../dynamic-form-action/dynamic-form-action-base';
import { DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormElementComponent } from '../dynamic-form-element/dynamic-form-element.component';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperBase } from '../dynamic-form-field/dynamic-form-field-wrapper-base';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputBase} from '../dynamic-form-input/dynamic-form-input-base';
import { DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form-component.factory';

@Component({
  selector: 'dynamic-form-test',
  template: `<ng-template #container></ng-template>`
})
class DynamicFormTestComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
}

@Component({
  selector: 'dynamic-form-element-test',
  template: `<div>Dynamic Form Element</div>`
})
class DynamicFormElementTestComponent extends DynamicFormElementBase {}

@Component({
  selector: 'dynamic-form-field-test',
  template: `<div>Dynamic Form Field</div>`
})
class DynamicFormFieldTestComponent extends DynamicFormFieldBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@Component({
  selector: 'dynamic-form-field-test',
  template: `<div>Dynamic Form Action</div>`
})
class DynamicFormActionTestComponent extends DynamicFormActionBase {}

@Component({
  selector: 'dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@Component({
  selector: 'dynamic-form-wrapper-test',
  template: `<ng-template #container></ng-template>`
})
class DynamicFormFieldWrapperTestComponent extends DynamicFormFieldWrapperBase {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }
}

@NgModule({
  declarations: [
    DynamicFormTestComponent,
    DynamicFormElementComponent,
    DynamicFormElementTestComponent,
    DynamicFormFieldTestComponent,
    DynamicFormActionTestComponent,
    DynamicFormInputTestComponent,
    DynamicFormFieldWrapperTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_LIBRARY,
      useValue: { name: 'test' }
    },
    {
      provide: DYNAMIC_FORM_ELEMENT_TYPES,
      useValue: [
        { libraryName: 'test', type: 'element', component: DynamicFormElementTestComponent }
      ]
    },
    {
      provide: DYNAMIC_FORM_FIELD_TYPES,
      useValue: [
        { libraryName: 'test', type: 'field', component: DynamicFormFieldTestComponent },
        { libraryName: 'test', type: 'field-wrapped', component: DynamicFormFieldTestComponent, wrappers: ['wrapper'] }
      ]
    },
    {
      provide: DYNAMIC_FORM_ACTION_TYPES,
      useValue: [
        { libraryName: 'test', type: 'action', component: DynamicFormActionTestComponent }
      ]
    },
    {
      provide: DYNAMIC_FORM_INPUT_TYPES,
      useValue: [
        { libraryName: 'test', type: 'input', component: DynamicFormInputTestComponent },
        { libraryName: 'test', type: 'input-wrapped', component: DynamicFormInputTestComponent, wrappers: ['wrapper'] }
      ]
    },
    {
      provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPES,
      useValue: [
        { libraryName: 'test', type: 'wrapper', component: DynamicFormFieldWrapperTestComponent },
      ]
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormElementTestComponent,
    DynamicFormFieldTestComponent,
    DynamicFormActionTestComponent,
    DynamicFormInputTestComponent,
    DynamicFormFieldWrapperTestComponent
  ]
})
class DynamicFormComponentFactoryTestModule {}

describe('DynamicFormComponentFactory', () => {
  let component: DynamicFormTestComponent;
  let fixture: ComponentFixture<DynamicFormTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComponentFactoryTestModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('throws error creating element component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const element = { componentType: 'element' };

      expect(() => factory.createComponent(component.container, <any>element))
        .toThrowError('Creating component of class type undefined is not supported');
    })
  );

  it('creates element component for element',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const element = { classType: 'element', componentType: 'element' };
      const elementComponent = factory.createComponent(component.container, <any>element);

      expect(elementComponent).toEqual(jasmine.any(DynamicFormElementTestComponent));
      expect(elementComponent.element).toBeDefined();
    })
  );

  it('creates field component for field',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const element = { classType: 'field', componentType: 'field' };
      const elementComponent = factory.createComponent(component.container, <any>element);

      expect(elementComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(elementComponent.element).toBeDefined();
    })
  );

  it('creates action component for action',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const element = { classType: 'action', componentType: 'action' };
      const elementComponent = factory.createComponent(component.container, <any>element);

      expect(elementComponent).toEqual(jasmine.any(DynamicFormActionTestComponent));
      expect(elementComponent.element).toBeDefined();
    })
  );

  it('creates element component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const element = { componentType: 'element' };
      const elementComponent = factory.createElementComponent(component.container, <any>element);

      expect(elementComponent).toEqual(jasmine.any(DynamicFormElementTestComponent));
      expect(elementComponent.element).toBeDefined();
    })
  );

  it('creates field component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { componentType: 'field' };
      const fieldComponent = factory.createFieldComponent(component.container, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { componentType: 'field-wrapped' };
      const wrapperComponent = factory.createFieldComponent(component.container, <any>field);
      const fieldComponent = (<DynamicFormFieldWrapperTestComponent>wrapperComponent).component;

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped multiple',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { componentType: 'field-wrapped', wrappers: ['wrapper'] };
      const wrapperWrapperComponent = <DynamicFormFieldWrapperTestComponent>factory.createFieldComponent(component.container, <any>field);
      const wrapperComponent = <DynamicFormFieldWrapperTestComponent>wrapperWrapperComponent.component;
      const fieldComponent = wrapperComponent.component;

      expect(wrapperWrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
      expect(wrapperWrapperComponent.field).toBeDefined();

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates action component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const action = { componentType: 'action' };
      const actionComponent = factory.createActionComponent(component.container, <any>action);

      expect(actionComponent).toEqual(jasmine.any(DynamicFormActionTestComponent));
      expect(actionComponent.action).toBeDefined();
    })
  );

  it('creates input component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { inputComponentType: 'input' };
      const fieldComponent = factory.createInputComponent(component.container, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { inputComponentType: 'input-wrapped' };
      const wrapperComponent = <DynamicFormFieldWrapperTestComponent>factory.createInputComponent(component.container, <any>field);
      const fieldComponent = wrapperComponent.component;

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped multiple',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { inputComponentType: 'input-wrapped', wrappers: ['wrapper'] };
      const wrapperWrapperComponent = <DynamicFormFieldWrapperTestComponent>factory.createInputComponent(component.container, <any>field);
      const wrapperComponent = <DynamicFormFieldWrapperTestComponent>wrapperWrapperComponent.component;
      const fieldComponent = wrapperComponent.component;

      expect(wrapperWrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
      expect(wrapperWrapperComponent.field).toBeDefined();

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );
});
