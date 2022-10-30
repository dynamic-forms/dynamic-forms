import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionBase } from '../dynamic-form-action/dynamic-form-action-base';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormElementComponent } from '../dynamic-form-element/dynamic-form-element.component';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperBase } from '../dynamic-form-field/dynamic-form-field-wrapper-base';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type-config';
import { DynamicFormInputBase} from '../dynamic-form-input/dynamic-form-input-base';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG } from '../dynamic-form-input/dynamic-form-input-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form-component.factory';

@Component({
  selector: 'dynamic-form-test',
  template: `<ng-template #container></ng-template>`,
})
class DynamicFormTestComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
}

@Component({
  selector: 'dynamic-form-element-test',
  template: `<div>Dynamic Form Element</div>`,
})
class DynamicFormElementTestComponent extends DynamicFormElementBase {}

@Component({
  selector: 'dynamic-form-field-test',
  template: `<div>Dynamic Form Field</div>`,
})
class DynamicFormFieldTestComponent extends DynamicFormFieldBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@Component({
  selector: 'dynamic-form-action-test',
  template: `<div>Dynamic Form Action</div>`,
})
class DynamicFormActionTestComponent extends DynamicFormActionBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}

@Component({
  selector: 'dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`,
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@Component({
  selector: 'dynamic-form-wrapper-test',
  template: `<ng-template #container></ng-template>`,
})
class DynamicFormFieldWrapperTestComponent extends DynamicFormFieldWrapperBase {
  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
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
    DynamicFormFieldWrapperTestComponent,
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' }),
    },
    {
      provide: DYNAMIC_FORM_INPUT_TYPE_CONFIG,
      useValue: [
        { libraryName: 'test', type: 'input', component: DynamicFormInputTestComponent },
        { libraryName: 'test', type: 'input-wrapped', component: DynamicFormInputTestComponent, wrappers: ['wrapper'] },
      ],
    },
    {
      provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG,
      useValue: [
        { libraryName: 'test', type: 'wrapper', component: DynamicFormFieldWrapperTestComponent },
      ],
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
    {
      provide: DynamicFormActionService,
      useValue: {},
    },
    DynamicFormComponentFactory,
  ],
})
class DynamicFormComponentFactoryTestModule {}

describe('DynamicFormComponentFactory', () => {
  let component: DynamicFormTestComponent;
  let fixture: ComponentFixture<DynamicFormTestComponent>;
  let factory: DynamicFormComponentFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComponentFactoryTestModule,
      ],
    });

    factory = TestBed.inject(DynamicFormComponentFactory);
    fixture = TestBed.createComponent(DynamicFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('throws error creating element component', () => {
    const element = {} as DynamicFormElement;

    expect(() => factory.createComponent(component.container, element))
      .toThrowError('Creating component of class type undefined is not supported');
  });

  it('creates element component for element', () => {
    const type = { type: 'element', component: DynamicFormElementTestComponent } as DynamicFormElementType;
    const element = { classType: 'element', type } as DynamicFormElement;
    const elementComponent = factory.createComponent(component.container, element);

    expect(elementComponent).toEqual(jasmine.any(DynamicFormElementTestComponent));
    expect(elementComponent.element).toBeTruthy();
  });

  it('creates field component for field', () => {
    const type = { type: 'field', component: DynamicFormFieldTestComponent } as any as DynamicFormFieldType;
    const element = { classType: 'field', type } as DynamicFormField;
    const elementComponent = factory.createComponent(component.container, element);

    expect(elementComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
    expect(elementComponent.element).toBeTruthy();
  });

  it('creates action component for action', () => {
    const type = { type: 'action', component: DynamicFormActionTestComponent } as any as DynamicFormActionType;
    const element = { classType: 'action', type } as DynamicFormAction;
    const elementComponent = factory.createComponent(component.container, element);

    expect(elementComponent).toEqual(jasmine.any(DynamicFormActionTestComponent));
    expect(elementComponent.element).toBeTruthy();
  });

  it('creates element component', () => {
    const type = { type: 'element', component: DynamicFormElementTestComponent } as DynamicFormElementType;
    const element = { type } as DynamicFormElement;
    const elementComponent = factory.createElementComponent(component.container, element);

    expect(elementComponent).toEqual(jasmine.any(DynamicFormElementTestComponent));
    expect(elementComponent.element).toBeTruthy();
  });

  it('creates field component', () => {
    const type = { type: 'field', component: DynamicFormFieldTestComponent } as any as DynamicFormFieldType;
    const field = { type } as DynamicFormField;
    const fieldComponent = factory.createFieldComponent(component.container, field);

    expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
    expect(fieldComponent.field).toBeTruthy();
  });

  it('creates field component wrapped', () => {
    const type = { type: 'field', component: DynamicFormFieldTestComponent, wrappers: ['wrapper'] } as any as DynamicFormFieldType;
    const field = { type } as DynamicFormField;
    const wrapperComponent = factory.createFieldComponent(component.container, field);
    const fieldComponent = (wrapperComponent as DynamicFormFieldWrapperTestComponent).component;

    expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
    expect(wrapperComponent.field).toBeTruthy();

    expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
    expect(fieldComponent.field).toBeTruthy();
  });

  it('creates field component wrapped multiple', () => {
    const type = { type: 'field', component: DynamicFormFieldTestComponent, wrappers: ['wrapper'] } as any as DynamicFormFieldType;
    const field = { type, wrappers: ['wrapper'] } as DynamicFormField;
    const wrapperWrapperComponent = factory.createFieldComponent(component.container, field) as DynamicFormFieldWrapperTestComponent;
    const wrapperComponent = wrapperWrapperComponent.component as DynamicFormFieldWrapperTestComponent;
    const fieldComponent = wrapperComponent.component;

    expect(wrapperWrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
    expect(wrapperWrapperComponent.field).toBeTruthy();

    expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
    expect(wrapperComponent.field).toBeTruthy();

    expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
    expect(fieldComponent.field).toBeTruthy();
  });

  it('creates action component', () => {
    const type = { type: 'action', component: DynamicFormActionTestComponent } as any as DynamicFormActionType;
    const action = { type } as DynamicFormAction;
    const actionComponent = factory.createActionComponent(component.container, action);

    expect(actionComponent).toEqual(jasmine.any(DynamicFormActionTestComponent));
    expect(actionComponent.action).toBeTruthy();
  });

  it('creates input component', () => {
    const field = { inputType: 'input' } as DynamicFormControl;
    const fieldComponent = factory.createInputComponent(component.container, field);

    expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
    expect(fieldComponent.field).toBeTruthy();
  });

  it('creates input component wrapped', () => {
    const field = { inputType: 'input-wrapped' } as DynamicFormControl;
    const wrapperComponent = factory.createInputComponent(component.container, field) as DynamicFormFieldWrapperTestComponent;
    const fieldComponent = wrapperComponent.component;

    expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
    expect(wrapperComponent.field).toBeTruthy();

    expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
    expect(fieldComponent.field).toBeTruthy();
  });

  it('creates input component wrapped multiple', () => {
    const field = { inputType: 'input-wrapped', wrappers: ['wrapper'] } as DynamicFormControl;
    const wrapperWrapperComponent = factory.createInputComponent(component.container, field) as DynamicFormFieldWrapperTestComponent;
    const wrapperComponent = wrapperWrapperComponent.component as DynamicFormFieldWrapperTestComponent;
    const fieldComponent = wrapperComponent.component;

    expect(wrapperWrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
    expect(wrapperWrapperComponent.field).toBeTruthy();

    expect(wrapperComponent).toEqual(jasmine.any(DynamicFormFieldWrapperTestComponent));
    expect(wrapperComponent.field).toBeTruthy();

    expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
    expect(fieldComponent.field).toBeTruthy();
  });
});
