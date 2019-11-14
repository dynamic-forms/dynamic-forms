import { async, TestBed } from '@angular/core/testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormContentDefinition } from './dynamic-form-content-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';
import { DynamicFormContentComponent } from './dynamic-form-content.component';
import { DynamicFormContentModule } from './dynamic-form-content.module';

describe('DynamicFormContentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormContentModule
      ]
    });
  }));

  it('creates component', () => {
    const template = <DynamicFormContentTemplate>{ content: '<span>Lavel</span>' };
    const definition = <DynamicFormContentDefinition>{ type: 'element', template };
    const element = new DynamicFormElement<DynamicFormContentTemplate>(definition);
    const fixture = TestBed.createComponent(DynamicFormContentComponent);
    const component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();

    expect(component.element).toBe(element);
    expect(component.content).toBe('<span>Lavel</span>');
  });
});
