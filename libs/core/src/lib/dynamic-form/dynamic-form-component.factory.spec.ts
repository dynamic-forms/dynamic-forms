import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormWrapper } from '../dynamic-form-wrapper/dynamic-form-wrapper';
import { DynamicFormComponentFactory } from './dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

@Component({
  selector: 'dynamic-form-test',
  template: `<ng-template #fieldContainer></ng-template>`
})
class DynamicFormTestComponent {
  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;
}

@Component({
  selector: 'dynamic-form-wrapper-test',
  template: `<ng-template #fieldContainer></ng-template>`
})
class DynamicFormWrapperTestComponent extends DynamicFormWrapper {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }
}

@Component({
  selector: 'dynamic-form-field-test',
  template: `<div>Dynamic Field</div>`
})
class DynamicFormFieldTestComponent extends DynamicFormFieldWrapper {}

@Component({
  selector: 'dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {}

@NgModule({
  declarations: [
    DynamicFormTestComponent,
    DynamicFormWrapperTestComponent,
    DynamicFormFieldTestComponent,
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        module: 'test',
        wrapperConfig: {
          types: [
            { type: 'wrapper', component: DynamicFormWrapperTestComponent }
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
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormWrapperTestComponent,
    DynamicFormFieldTestComponent,
    DynamicFormInputTestComponent
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

  it('creates field component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { type: 'field' } };
      const fieldComponent = factory.createFieldComponent(component.fieldContainer, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { type: 'field-wrapped' } };
      const wrapperComponent = factory.createFieldComponent(component.fieldContainer, <any>field);
      const fieldComponent = (<DynamicFormWrapperTestComponent>wrapperComponent).fieldComponent;

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped multiple',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { wrappers: ['wrapper'], type: 'field-wrapped' } };
      const wrapperWrapperComponent = <DynamicFormWrapperTestComponent>factory.createFieldComponent(component.fieldContainer, <any>field);
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
      const field = { template: { input: { type: 'input' } } };
      const fieldComponent = factory.createInputComponent(component.fieldContainer, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { input: { type: 'input-wrapped' } } };
      const wrapperComponent = <DynamicFormWrapperTestComponent>factory.createInputComponent(component.fieldContainer, <any>field);
      const fieldComponent = wrapperComponent.fieldComponent;

      expect(wrapperComponent).toEqual(jasmine.any(DynamicFormWrapperTestComponent));
      expect(wrapperComponent.field).toBeDefined();

      expect(fieldComponent).toEqual(jasmine.any(DynamicFormInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped multiple',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { wrappers: ['wrapper'], input: { type: 'input-wrapped' } } };
      const wrapperWrapperComponent = <DynamicFormWrapperTestComponent>factory.createInputComponent(component.fieldContainer, <any>field);
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
