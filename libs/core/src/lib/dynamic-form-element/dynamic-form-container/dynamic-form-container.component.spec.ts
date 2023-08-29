import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormContainerDefinition } from './dynamic-form-container-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

describe('DynamicFormContainerComponent', () => {
  let builder: DynamicFormBuilder;
  let fixture: ComponentFixture<DynamicFormContainerComponent>;
  let component: DynamicFormContainerComponent;
  let element: DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormContainerComponent ],
    });

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = {} as DynamicFormContainerTemplate;
    const definition = { type: 'element', template } as DynamicFormContainerDefinition;
    const type = {} as DynamicFormElementType;
    element = new DynamicFormElement<DynamicFormContainerTemplate, DynamicFormContainerDefinition>(builder, root, parent, definition, type);

    fixture = TestBed.createComponent(DynamicFormContainerComponent);
    component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
  });

  it('renders component template', () => {
    const debugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement).toBeTruthy();
  });

  it('sets dynamic form container to hidden', () => {
    const debugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(htmlElement.hidden).toBeTrue();
  });

  it('sets class name of dynamic form container', () => {
    const debugElement = fixture.debugElement.query(By.css('div.dynamic-form-container'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement.className).toBe('dynamic-form-container');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(htmlElement.className).toBe('dynamic-form-container className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(htmlElement.className).toBe('dynamic-form-container');
  });
});
