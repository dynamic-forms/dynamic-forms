import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormTextDefinition } from './dynamic-form-text-definition';
import { DynamicFormTextTemplate } from './dynamic-form-text-template';
import { DynamicFormTextComponent } from './dynamic-form-text.component';

describe('DynamicFormTextComponent', () => {
  let builder: DynamicFormBuilder;
  let fixture: ComponentFixture<DynamicFormTextComponent>;
  let component: DynamicFormTextComponent;
  let element: DynamicFormElement<DynamicFormTextTemplate, DynamicFormTextDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormTextComponent],
    });

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = { text: 'Text' } as DynamicFormTextTemplate;
    const definition = { type: 'element', template } as DynamicFormTextDefinition;
    const type = {} as DynamicFormElementType;
    element = new DynamicFormElement<DynamicFormTextTemplate, DynamicFormTextDefinition>(builder, root, parent, definition, type);

    fixture = TestBed.createComponent(DynamicFormTextComponent);
    component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.text).toBe('Text');
  });

  it('renders component template', () => {
    const debugElement = fixture.debugElement.query(By.css('span.dynamic-form-text'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement).toBeTruthy();
    expect(htmlElement.innerText).toBe('Text');
  });

  it('sets dynamic form text to hidden', () => {
    const debugElement = fixture.debugElement.query(By.css('span.dynamic-form-text'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(htmlElement.hidden).toBeTrue();
  });

  it('sets class name of dynamic form text', () => {
    const debugElement = fixture.debugElement.query(By.css('span.dynamic-form-text'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement.className).toBe('dynamic-form-text');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(htmlElement.className).toBe('dynamic-form-text className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(htmlElement.className).toBe('dynamic-form-text');
  });
});
