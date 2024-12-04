import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementType } from './dynamic-form-element-type';
import { DynamicFormElementComponent } from './dynamic-form-element.component';

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

describe('DynamicFormElementComponent', () => {
  let fixture: ComponentFixture<DynamicFormElementComponent>;
  let component: DynamicFormElementComponent;
  let element: DynamicFormElement;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormElementComponentTestModule],
    });

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'element', template: {} } as DynamicFormElementDefinition;
    const type = { type: 'element', component: DynamicFormElementBaseComponent } as DynamicFormElementType;

    builder = {} as any;
    element = new DynamicFormElement(builder, root, parent, definition, type);

    fixture = TestBed.createComponent(DynamicFormElementComponent);
    component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
  });

  it('renders component template', () => {
    const formElementDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-element'));
    const formElementElement = formElementDebugElement.nativeElement as HTMLElement;

    expect(formElementElement).toBeTruthy();
  });
});
