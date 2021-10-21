import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from './dynamic-form-element-type-config';
import { DynamicFormElementComponent } from './dynamic-form-element.component';
import { DynamicFormElementModule } from './dynamic-form-element.module';

@Component({
  selector: 'dynamic-element-test',
  template: `<div class="dynamic-form-element"></div>`
})
class DynamicFormElementBaseComponent extends DynamicFormElementBase {}

@NgModule({
  imports: [
    DynamicFormElementModule
  ],
  declarations: [
    DynamicFormElementBaseComponent
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' })
    },
    {
      provide: DYNAMIC_FORM_ELEMENT_TYPE_CONFIG,
      useValue: [
        { libraryName: 'test', type: 'element', component: DynamicFormElementBaseComponent }
      ]
    },
    DynamicFormConfigService,
    DynamicFormComponentFactory
  ]
})
class DynamicFormElementComponentTestModule {}

describe('DynamicFormElementComponent', () => {
  let fixture: ComponentFixture<DynamicFormElementComponent>;
  let component: DynamicFormElementComponent;
  let element: DynamicFormElement;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormElementComponentTestModule
      ]
    });

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'element', template: {} } as DynamicFormElementDefinition;

    builder = {} as any;
    element = new DynamicFormElement(builder, root, parent, definition);

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
