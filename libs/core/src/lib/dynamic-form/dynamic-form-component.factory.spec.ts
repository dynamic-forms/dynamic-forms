import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field.base';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponentFactory } from './dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

@Component({
  selector: 'dynamic-form-test',
  template: `<ng-template #component></ng-template>`
})
class DynamicFormTestComponent {
  @ViewChild('component', { read: ViewContainerRef })
  component: ViewContainerRef;
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
    DynamicFieldTestComponent,
    DynamicInputTestComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        module: 'test',
        wrapperConfig: {
          types: [ { type: 'wrapper', component: null } ]
        },
        fieldConfig: {
          types: [ { type: 'group', component: DynamicFieldTestComponent } ]
        },
        inputConfig: {
          types: [ { type: 'input', component: DynamicInputTestComponent } ]
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFieldTestComponent,
    DynamicInputTestComponent
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
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('creates field component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { type: 'group' } };
      const fieldComponentRef = factory.createFieldComponent(component.component, <any>field);

      expect(fieldComponentRef).toBeDefined();
      expect(fieldComponentRef.instance).toBeDefined();
      expect(fieldComponentRef.instance.field).toBeDefined();
    })
  );

  it('creates input component',
    inject([DynamicFormComponentFactory], (factory: DynamicFormComponentFactory) => {
      const field = { template: { input: { type: 'input' } } };
      const fieldComponentRef = factory.createInputComponent(component.component, <any>field);

      expect(fieldComponentRef).toBeDefined();
      expect(fieldComponentRef.instance).toBeDefined();
      expect(fieldComponentRef.instance.field).toBeDefined();
    })
  );
});
