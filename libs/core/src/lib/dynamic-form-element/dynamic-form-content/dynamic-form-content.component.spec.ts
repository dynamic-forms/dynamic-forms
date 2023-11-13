import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormContentDefinition } from './dynamic-form-content-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

describe('DynamicFormContentComponent', () => {
  let builder: DynamicFormBuilder;
  let fixture: ComponentFixture<DynamicFormContentComponent>;
  let component: DynamicFormContentComponent;
  let element: DynamicFormElement<DynamicFormContentTemplate, DynamicFormContentDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormContentComponent],
    });

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = { content: '<span>Content</span>' } as DynamicFormContentTemplate;
    const definition = { type: 'element', template } as DynamicFormContentDefinition;
    const type = {} as DynamicFormElementType;
    element = new DynamicFormElement<DynamicFormContentTemplate, DynamicFormContentDefinition>(builder, root, parent, definition, type);

    fixture = TestBed.createComponent(DynamicFormContentComponent);
    component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.content).toBe('<span>Content</span>');
  });

  it('renders component template', () => {
    const debugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement).toBeTruthy();
    expect(htmlElement.innerHTML).toBe('<span>Content</span>');
  });

  it('sets dynamic form content to hidden', () => {
    const debugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(htmlElement.hidden).toBeTrue();
  });

  it('sets class name of dynamic form content', () => {
    const debugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const htmlElement = debugElement.nativeElement as HTMLElement;

    expect(htmlElement.className).toBe('dynamic-form-content');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(htmlElement.className).toBe('dynamic-form-content className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(htmlElement.className).toBe('dynamic-form-content');
  });
});
