import { Component } from '@angular/core';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormButtonBase } from './dynamic-form-button-base';
import { DynamicFormButtonDefinition } from './dynamic-form-button-definition';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';

@Component({
  selector: 'dynamic-form-button-test',
  template: `
    <button class="dynamic-form-button"
      [class.hidden]="template?.hidden" [ngClass]="template?.className"
      [type]="template?.type || 'button'" [disabled]="template?.disabled"
      (click)="onClick($event)"
    >{{ template?.label }}</button>
  `
})
class DynamicFormButtonTestComponent extends DynamicFormButtonBase {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

describe('DynamicFormButtonBase', () => {
  let fixture: ComponentFixture<DynamicFormButtonTestComponent>;
  let component: DynamicFormButtonTestComponent;
  let element: DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormButtonTestComponent
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormButtonTestComponent);
    component = fixture.componentInstance;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const template = { label: 'label' } as DynamicFormButtonTemplate;
    const definition = { type: 'element', template } as DynamicFormButtonDefinition;
    element = new DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>(root, parent, definition);
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.template.label).toBe('label');
  });

  it('renders component template', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement).toBeTruthy();
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerHTML).toBe('label');
  });

  it('sets dynamic form button to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe('dynamic-form-button');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button hidden');
  });

  it('sets class name of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe('dynamic-form-button');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button');
  });

  it('sets type of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
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

  it('executes action onClick',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      spyOn(service, 'handle');

      const event = null;
      component.onClick(event);

      expect(service.handle).toHaveBeenCalledWith(component.element, event);
    })
  );
});
