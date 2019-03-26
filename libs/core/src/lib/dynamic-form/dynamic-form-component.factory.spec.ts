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
  template: `<ng-template #fieldContainer></ng-template>`
})
class DynamicFormTestComponent {
  @ViewChild('fieldContainer', { read: ViewContainerRef })
  fieldContainer: ViewContainerRef;
}

@Component({
  selector: 'dynamic-wrapper-test',
  template: `<ng-template #fieldContainer></ng-template>`
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
      const fieldComponent = factory.createFieldComponent(formComponent.fieldContainer, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicFieldTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates field component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { type: 'field-wrapped' } };
      const fieldComponent = <DynamicWrapperTestComponent>factory.createFieldComponent(formComponent.fieldContainer, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicWrapperTestComponent));
      expect(fieldComponent.field).toBeDefined();
      expect(fieldComponent.fieldComponent).toEqual(jasmine.any(DynamicFieldTestComponent));
    })
  );

  it('creates input component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { input: { type: 'input' } } };
      const fieldComponent = factory.createInputComponent(formComponent.fieldContainer, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicInputTestComponent));
      expect(fieldComponent.field).toBeDefined();
    })
  );

  it('creates input component wrapped',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { input: { type: 'input-wrapped' } } };
      const fieldComponent = <DynamicWrapperTestComponent>factory.createInputComponent(formComponent.fieldContainer, <any>field);

      expect(fieldComponent).toEqual(jasmine.any(DynamicWrapperTestComponent));
      expect(fieldComponent.field).toBeDefined();
      expect(fieldComponent.fieldComponent).toEqual(jasmine.any(DynamicInputTestComponent));
    })
  );
});
