import { Component, NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DYNAMIC_FORM_CONFIG } from '../dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementWrapper } from './dynamic-form-element-wrapper';
import { DynamicFormElementComponent } from './dynamic-form-element.component';
import { DynamicFormElementModule } from './dynamic-form-element.module';

@Component({
  selector: 'dynamic-element-test',
  template: `<div>Dynamic Element</div>`
})
class DynamicFormElementWrapperComponent extends DynamicFormElementWrapper {}

@NgModule({
  imports: [
    DynamicFormElementModule
  ],
  declarations: [
    DynamicFormElementWrapperComponent
  ],
  entryComponents: [
    DynamicFormElementWrapperComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: {
        library: 'test',
        elementConfig: {
          types: [
            { type: 'element', component: DynamicFormElementWrapperComponent }
          ]
        }
      }
    },
    DynamicFormConfigService,
    DynamicFormComponentFactory
  ]
})
class DynamicFormElementComponentTestModule {}

describe('DynamicFormElementComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormElementComponentTestModule
      ]
    });
  }));

  it('creates component', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
    const element = new DynamicFormElement(definition);
    const fixture = TestBed.createComponent(DynamicFormElementComponent);
    const component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();

    expect(component.element).toBe(element);
    expect(component.definition).toBe(definition);
    expect(component.template).toBe(definition.template);
  });
});
