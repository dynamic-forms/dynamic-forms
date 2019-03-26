import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormWrapper } from '../dynamic-form-wrapper/dynamic-form-wrapper';
import { DynamicFormComponentFactory } from './dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

@Component({
  selector: 'dynamic-form-test',
  template: `<ng-template #fieldComponent></ng-template>`
})
class DynamicFormTestComponent {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;
}

@Component({
  selector: 'dynamic-wrapper-test',
  template: `<ng-template #fieldComponent></ng-template>`
})
class DynamicWrapperTestComponent extends DynamicFormWrapper {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }
}

@Component({
  selector: 'dynamic-field-test',
  template: `<div>Dynamic Field</div>`
})
class DynamicFieldTestComponent extends DynamicFormFieldBase {}

@Component({
  selector: 'dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicInputTestComponent extends DynamicFormInputComponent {}

@NgModule({
  declarations: [
    DynamicFormTestComponent,
    DynamicWrapperTestComponent,
    DynamicFieldTestComponent,
    DynamicInputTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        module: 'test',
        wrapperConfig: {
          types: [
            { type: 'wrapper', component: DynamicWrapperTestComponent }
          ]
        },
        fieldConfig: {
          types: [
            { type: 'field', component: DynamicFieldTestComponent },
            { type: 'field-wrapped', component: DynamicFieldTestComponent, wrappers: ['wrapper'] }
          ]
        },
        inputConfig: {
          types: [
            { type: 'input', component: DynamicInputTestComponent },
            { type: 'input-wrapped', component: DynamicInputTestComponent, wrappers: ['wrapper'] }
          ]
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicWrapperTestComponent,
    DynamicFieldTestComponent,
    DynamicInputTestComponent
  ]
})
class DynamicFormComponentFactoryTestModule {}

describe('DynamicFormComponentFactory', () => {
  let formComponent: DynamicFormTestComponent;
  let fixture: ComponentFixture<DynamicFormTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormComponentFactoryTestModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTestComponent);
    formComponent = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('creates field component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { type: 'field' } };
      const componentRef = factory.createFieldComponent(formComponent.fieldComponent, <any>field);
      const component = <DynamicFieldTestComponent>componentRef.instance;

      expect(component).toEqual(jasmine.any(DynamicFieldTestComponent));
      expect(component.field).toBeDefined();
    })
  );

  it('creates field component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { type: 'field-wrapped' } };
      const componentRef = factory.createFieldComponent(formComponent.fieldComponent, <any>field);
      const component = <DynamicWrapperTestComponent>componentRef.instance;

      expect(component).toEqual(jasmine.any(DynamicWrapperTestComponent));
      expect(component.field).toBeDefined();
      expect(component.ref.get(0)).toBeDefined();
    })
  );

  it('creates input component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { input: { type: 'input' } } };
      const componentRef = factory.createInputComponent(formComponent.fieldComponent, <any>field);
      const component = <DynamicInputTestComponent>componentRef.instance;

      expect(component).toEqual(jasmine.any(DynamicInputTestComponent));
      expect(component.field).toBeDefined();
    })
  );

  it('creates input component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { input: { type: 'input-wrapped' } } };
      const componentRef = factory.createInputComponent(formComponent.fieldComponent, <any>field);
      const component = <DynamicWrapperTestComponent>componentRef.instance;

      expect(component).toEqual(jasmine.any(DynamicWrapperTestComponent));
      expect(component.field).toBeDefined();
      expect(component.ref.get(0)).toBeDefined();
    })
  );
});
