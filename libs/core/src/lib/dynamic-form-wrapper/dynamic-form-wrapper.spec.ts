import { Component, ComponentFactoryResolver, NgModule, ViewContainerRef } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormWrapper } from './dynamic-form-wrapper';

@Component({
  selector: 'dynamic-form-wrapper-test',
  template: `<ng-template #fieldContainer></ng-template>`
})
class DynamicFormWrapperTestComponent extends DynamicFormWrapper {
  constructor(
    protected validationService: DynamicFormValidationService,
    protected containerRef: ViewContainerRef
  ) {
    super(validationService, containerRef);
  }
}

@Component({
  selector: 'dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {}

@NgModule({
  declarations: [
    DynamicFormWrapperTestComponent,
    DynamicFormInputTestComponent
  ],
  entryComponents: [
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormConfigService,
      useValue: new DynamicFormConfigService({
        module: 'test'
      })
    },
    DynamicFormValidationService
  ]
})
class DynamicFormWrapperTestModule {}

describe('DynamicFormWrapper', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormWrapperTestModule
      ]
    });
  }));

  it('creates component',
    inject([ComponentFactoryResolver], (resolver: ComponentFactoryResolver) => {
      const factory = resolver.resolveComponentFactory(DynamicFormInputTestComponent);
      const fixture = TestBed.createComponent(DynamicFormWrapperTestComponent);
      const component = fixture.componentInstance;

      component.fieldComponent = component.ref.createComponent(factory).instance;
      fixture.detectChanges();

      expect(component).toBeDefined();
    })
  );
});
