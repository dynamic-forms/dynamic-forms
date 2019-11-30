import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormElementComponent } from '../dynamic-form-element/dynamic-form-element.component';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormInputBase} from '../dynamic-form-input/dynamic-form-input-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormWrapper } from '../dynamic-form-wrapper/dynamic-form-wrapper';
import { DynamicFormComponentFactory } from './dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

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
  template: `<div>Dynamic Element</div>`
})
class DynamicFormElementTestComponent extends DynamicFormElementBase {}

@Component({
  selector: 'dynamic-form-field-test',
  template: `<div>Dynamic Field</div>`
})
class DynamicFormFieldTestComponent extends DynamicFormFieldBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

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
  template: `<ng-template #fieldContainer></ng-template>`
})
class DynamicFormWrapperTestComponent extends DynamicFormWrapper {
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
    DynamicFormWrapperTestComponent,
    DynamicFormFieldTestComponent,
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        library: 'test',
        elementConfig: {
          types: [
            { type: 'element', component: DynamicFormElementTestComponent },
          ]
        },
        fieldConfig: {
          types: [
            { type: 'field', component: DynamicFormFieldTestComponent },
            { type: 'field-wrapped', component: DynamicFormFieldTestComponent, wrappers: ['wrapper'] }
          ]
        },
        inputConfig: {
          types: [
            { type: 'input', component: DynamicFormInputTestComponent },
            { type: 'input-wrapped', component: DynamicFormInputTestComponent, wrappers: ['wrapper'] }
          ]
        },
        wrapperConfig: {
          types: [
            { type: 'wrapper', component: DynamicFormWrapperTestComponent }
          ]
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormElementTestComponent,
    DynamicFormFieldTestComponent,
    DynamicFormInputTestComponent,
    DynamicFormWrapperTestComponent
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

  it('creates element component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const element = { type: 'element' };
      const elementComponent = factory.createElementComponent(component.container, <any>element);

      expect(elementComponent).toEqual(jasmine.any(DynamicFormElementTestComponent));
      expect(elementComponent.element).toBeDefined();
    })
  );

  it('creates field component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { type: 'field' };
      const fieldComponent = factory.createFieldComponent(component.container, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { type: 'field-wrapped' };
      const wrapperComponent = factory.createFieldComponent(component.container, <any>field);
      const fieldComponent = (<DynamicFormWrapperTestComponent>wrapperComponent).fieldComponent;

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped multiple',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { type: 'field-wrapped', wrappers: ['wrapper'] };
      const wrapperWrapperComponent = <DynamicFormWrapperTestComponent>factory.createFieldComponent(component.container, <any>field);
      const wrapperComponent = <DynamicFormWrapperTestComponent>wrapperWrapperComponent.fieldComponent;
      const fieldComponent = wrapperComponent.fieldComponent;

      expect(wrapperWrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperWrapperComponent.field).toBeDefined();

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { inputType: 'input' };
      const fieldComponent = factory.createInputComponent(component.container, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { inputType: 'input-wrapped' };
      const wrapperComponent = <DynamicFormWrapperTestComponent>factory.createInputComponent(component.container, <any>field);
      const fieldComponent = wrapperComponent.fieldComponent;

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped multiple',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { inputType: 'input-wrapped', wrappers: ['wrapper'] };
      const wrapperWrapperComponent = <DynamicFormWrapperTestComponent>factory.createInputComponent(component.container, <any>field);
      const wrapperComponent = <DynamicFormWrapperTestComponent>wrapperWrapperComponent.fieldComponent;
      const fieldComponent = wrapperComponent.fieldComponent;

      expect(wrapperWrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperWrapperComponent.field).toBeDefined();

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );
});
