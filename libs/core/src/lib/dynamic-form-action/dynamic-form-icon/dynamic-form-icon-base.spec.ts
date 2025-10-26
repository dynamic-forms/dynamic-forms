import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionType } from '../dynamic-form-action-type';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormIconBase } from './dynamic-form-icon-base';
import { DynamicFormIconDefinition } from './dynamic-form-icon-definition';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';

@Component({
  selector: 'dynamic-form-icon-test',
  imports: [NgClass],
  // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
  template: `
    <button
      class="dynamic-form-icon"
      [ngClass]="template.className"
      [type]="template.type || 'button'"
      [disabled]="template.disabled"
      [hidden]="template.hidden"
      (click)="onClick($event)"
    >
      {{ template?.label }}
    </button>
  `,
})
class DynamicFormIconTestComponent extends DynamicFormIconBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}

describe('DynamicFormIconBase', () => {
  let fixture: ComponentFixture<DynamicFormIconTestComponent>;
  let component: DynamicFormIconTestComponent;
  let element: DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormActionService,
      ],
    });

    fixture = TestBed.createComponent(DynamicFormIconTestComponent);
    component = fixture.componentInstance;

    builder = MockService(DynamicFormBuilder);

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const template = { label: 'label' } as DynamicFormIconTemplate;
    const definition = { type: 'element', template } as DynamicFormIconDefinition;
    const type = {} as DynamicFormActionType;
    element = new DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>(builder, root, parent, definition, type);
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.template.label).toBe('label');
  });

  it('renders component template', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement).toBeTruthy();
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerHTML).toBe(' label ');
  });

  it('sets dynamic form icon to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.hidden).toBeTrue();
  });

  it('sets class name of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe('dynamic-form-icon');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon');
  });

  it('sets type of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.type).toBe('button');

    component.template.type = 'submit';
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('submit');

    component.template.type = 'reset';
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('reset');

    component.template.type = 'button';
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('button');

    component.template.type = null;
    fixture.detectChanges();

    expect(formButtonElement.type).toBe('button');
  });

  it('executes action onClick', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handleSpy = spyOn(service, 'handle');

    const event = null;
    component.onClick(event);

    expect(handleSpy).toHaveBeenCalledWith(component.element, event);
  }));
});
