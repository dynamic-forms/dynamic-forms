import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';
import { BsDynamicFormWrapperModule } from './dynamic-form-wrapper.module';

@Component({
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {}

@NgModule({
  imports: [
    BsDynamicFormWrapperModule
  ],
  declarations: [
    DynamicFormInputTestComponent
  ],
  entryComponents: [
    DynamicFormInputTestComponent
  ]
})
class DynamicFormWrapperTestModule {}

describe('BsDynamicFormControlHintsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlHintsComponent>;
  let component: BsDynamicFormControlHintsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormWrapperTestModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormControlHintsComponent);
    component = fixture.componentInstance;
    component.field = <any>{
      path: 'path',
      template: {
        label: 'label'
      }
    };

    // tslint:disable-next-line: deprecation
    const resolver = TestBed.get(ComponentFactoryResolver);
    const factory = resolver.resolveComponentFactory(DynamicFormInputTestComponent);
    component.fieldComponent = component.ref.createComponent<DynamicFormInputTestComponent>(factory).instance;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
  });
});
