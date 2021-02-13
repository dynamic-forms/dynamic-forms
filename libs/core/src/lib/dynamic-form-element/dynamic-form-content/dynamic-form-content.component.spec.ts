import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormContentDefinition } from './dynamic-form-content-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

describe('DynamicFormContentComponent', () => {
  let fixture: ComponentFixture<DynamicFormContentComponent>;
  let component: DynamicFormContentComponent;
  let element: DynamicFormElement<DynamicFormContentTemplate, DynamicFormContentDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormContentComponent
      ]
    });

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = { content: '<span>Content</span>' } as DynamicFormContentTemplate;
    const definition = { type: 'element', template } as DynamicFormContentDefinition;
    element = new DynamicFormElement<DynamicFormContentTemplate, DynamicFormContentDefinition>(root, parent, definition);

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
    const formContentDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const formContentElement = formContentDebugElement.nativeElement as HTMLElement;

    expect(formContentElement).toBeTruthy();
    expect(formContentElement.innerHTML).toBe('<span>Content</span>');
  });

  it('sets class name of dynamic form content', () => {
    const formContentDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const formContentElement = formContentDebugElement.nativeElement as HTMLElement;

    expect(formContentElement.className).toBe('dynamic-form-content');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formContentElement.className).toBe('dynamic-form-content className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formContentElement.className).toBe('dynamic-form-content');
  });
});
