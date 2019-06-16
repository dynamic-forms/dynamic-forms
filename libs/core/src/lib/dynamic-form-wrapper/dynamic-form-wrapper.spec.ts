import { Component, ComponentFactoryResolver, NgModule, ViewContainerRef } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormWrapper } from './dynamic-form-wrapper';

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
