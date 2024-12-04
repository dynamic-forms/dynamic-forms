import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementComponent } from './dynamic-form-element.component';
import { DynamicFormElementsComponent } from './dynamic-form-elements.component';

@Component({
  selector: 'dynamic-element-test',
  template: `<div class="dynamic-form-element"></div>`,
})
class DynamicFormElementBaseComponent extends DynamicFormElementBase {}

@NgModule({
  providers: [
    {
      provide: DynamicFormConfigService,
      useValue: {},
    },
    {
      provide: DynamicFormErrorHandler,
      useValue: { handle: () => {} },
    },
    DynamicFormComponentFactory,
  ],
})
class DynamicFormElementComponentTestModule {}

describe('DynamicFormElementsComponent', () => {
  let fixture: ComponentFixture<DynamicFormElementsComponent>;
  let component: DynamicFormElementsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormElementComponentTestModule],
    });

    fixture = TestBed.createComponent(DynamicFormElementsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders component template', () => {
    const type = { type: 'element', component: DynamicFormElementBaseComponent };
    const elements = [
      { classType: 'element', type },
      { classType: 'element', type },
    ] as DynamicFormElement[];
    component.elements = elements;

    fixture.detectChanges();

    const formElementDebugElements = fixture.debugElement.queryAll(By.directive(DynamicFormElementComponent));
    const formElementComponents = formElementDebugElements.map(el => el.componentInstance as DynamicFormElementComponent);

    expect(formElementComponents.length).toBe(2);
    expect(formElementComponents[0].element).toBe(elements[0]);
    expect(formElementComponents[1].element).toBe(elements[1]);

    const formElementBaseDebugElements = fixture.debugElement.queryAll(By.directive(DynamicFormElementBaseComponent));
    const formElementBaseComponents = formElementBaseDebugElements.map(el => el.componentInstance as DynamicFormElementBaseComponent);

    expect(formElementBaseComponents.length).toBe(2);
    expect(formElementBaseComponents[0].element).toBe(elements[0]);
    expect(formElementBaseComponents[1].element).toBe(elements[1]);
  });
});
