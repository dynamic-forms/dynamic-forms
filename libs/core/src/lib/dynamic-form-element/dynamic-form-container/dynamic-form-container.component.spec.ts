import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormContainerDefinition } from './dynamic-form-container-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';
import { DynamicFormContainerModule } from './dynamic-form-container.module';

describe('DynamicFormContainerComponent', () => {
  let fixture: ComponentFixture<DynamicFormContainerComponent>;
  let component: DynamicFormContainerComponent;
  let element: DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DynamicFormContainerModule ]
    });

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = {} as DynamicFormContainerTemplate;
    const definition = { type: 'element', template } as DynamicFormContainerDefinition;
    element = new DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>(root, parent, definition);

    fixture = TestBed.createComponent(DynamicFormContainerComponent);
    component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
  });

  it('renders component template', () => {
    const formContainerDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const formContainerElement = formContainerDebugElement.nativeElement as HTMLElement;

    expect(formContainerElement).toBeTruthy();
  });

  it('sets class name of dynamic form container', () => {
    const formContainerDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const formContainerElement = formContainerDebugElement.nativeElement as HTMLElement;

    expect(formContainerElement.className).toBe('dynamic-form-container');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formContainerElement.className).toBe('dynamic-form-container className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formContainerElement.className).toBe('dynamic-form-container');
  });
});
