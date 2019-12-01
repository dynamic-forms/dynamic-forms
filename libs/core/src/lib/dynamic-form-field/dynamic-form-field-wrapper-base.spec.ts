import { Component, ComponentFactoryResolver, NgModule, ViewContainerRef } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

@Component({
  selector: 'dynamic-form-field-wrapper-test',
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

@Component({
  selector: 'dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  declarations: [
    DynamicFormFieldWrapperTestComponent,
    DynamicFormInputTestComponent
  ],
  entryComponents: [
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormConfigService,
      useValue: new DynamicFormConfigService({
        library: 'test'
      })
    },
    DynamicFormValidationService
  ]
})
class DynamicFormFieldWrapperTestModule {}

describe('DynamicFormFieldWrapper', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormFieldWrapperTestModule
      ]
    });
  }));

  it('creates component',
    inject([ComponentFactoryResolver], (resolver: ComponentFactoryResolver) => {
      const factory = resolver.resolveComponentFactory(DynamicFormInputTestComponent);
      const fixture = TestBed.createComponent(DynamicFormFieldWrapperTestComponent);
      const component = fixture.componentInstance;

      component.component = component.ref.createComponent(factory).instance;
      fixture.detectChanges();

      expect(component).toBeDefined();
    })
  );
});
