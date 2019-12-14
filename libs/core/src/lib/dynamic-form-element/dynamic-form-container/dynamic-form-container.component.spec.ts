import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementComponent } from '../dynamic-form-element.component';
import { DynamicFormContainerDefinition } from './dynamic-form-container-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

describe('DynamicFormContainerComponent', () => {
  let fixture: ComponentFixture<DynamicFormContainerComponent>;
  let component: DynamicFormContainerComponent;
  let element: DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormElementComponent,
        DynamicFormContainerComponent
      ]
    });

    fixture = TestBed.createComponent(DynamicFormContainerComponent);
    component = fixture.componentInstance;

    const template = <DynamicFormContainerTemplate>{};
    const definition = <DynamicFormContainerDefinition>{ type: 'element', template };
    element = new DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>(definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
  });

  it('creates component template', () => {
    const formContainerDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const formContainerElement = <HTMLElement>formContainerDebugElement.nativeElement;

    expect(formContainerElement).toBeDefined();
  });

  it('sets class name of dynamic form container', () => {
    const formContainerDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const formContainerElement = <HTMLElement>formContainerDebugElement.nativeElement;

    expect(formContainerElement.className).toBe('dynamic-form-container');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formContainerElement.className).toBe('dynamic-form-container className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formContainerElement.className).toBe('dynamic-form-container');
  });
});
