import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormContentDefinition } from './dynamic-form-content-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

describe('DynamicFormContentComponent', () => {
  let fixture: ComponentFixture<DynamicFormContentComponent>;
  let component: DynamicFormContentComponent;
  let element: DynamicFormElement<DynamicFormContentTemplate, DynamicFormContentDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormContentComponent
      ]
    });

    fixture = TestBed.createComponent(DynamicFormContentComponent);
    component = fixture.componentInstance;

    const template = <DynamicFormContentTemplate>{ content: '<span>Content</span>' };
    const definition = <DynamicFormContentDefinition>{ type: 'element', template };
    element = new DynamicFormElement<DynamicFormContentTemplate, DynamicFormContentDefinition>(definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.content).toBe('<span>Content</span>');
  });

  it('creates component template', () => {
    const formContentDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const formContentElement = <HTMLElement>formContentDebugElement.nativeElement;

    expect(formContentElement).toBeDefined();
    expect(formContentElement.innerHTML).toBe('<span>Content</span>');
  });

  it('sets class name of dynamic form content', () => {
    const formContentDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-content'));
    const formContentElement = <HTMLElement>formContentDebugElement.nativeElement;

    expect(formContentElement.className).toBe('dynamic-form-content');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formContentElement.className).toBe('dynamic-form-content className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formContentElement.className).toBe('dynamic-form-content');
  });
});
