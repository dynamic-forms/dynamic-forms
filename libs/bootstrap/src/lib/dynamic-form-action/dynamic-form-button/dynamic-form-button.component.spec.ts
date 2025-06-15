import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormAction,
  DynamicFormActionService,
  DynamicFormActionType,
  DynamicFormBuilder,
  DynamicFormButtonDefinition,
  DynamicFormButtonTemplate,
  DynamicFormColorService,
  DynamicFormField,
  DynamicFormLibraryService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { BsDynamicFormButtonComponent } from './dynamic-form-button.component';

describe('BsDynamicFormButtonComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormButtonComponent>;
  let component: BsDynamicFormButtonComponent;
  let element: DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormButtonComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormActionService,
        DynamicFormColorService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormButtonComponent);
    component = fixture.componentInstance;

    builder = MockService(DynamicFormBuilder);

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const template = { label: 'label' } as DynamicFormButtonTemplate;
    const definition = { id: 'id', type: 'element', template } as DynamicFormButtonDefinition;
    const type = {} as DynamicFormActionType;
    element = new DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>(builder, root, parent, definition, type);
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
    expect(formButtonElement.id).toBe('id');
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerText).toBe('label');
  });

  it('sets dynamic form button to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.hidden).toBeFalse();

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.hidden).toBeTrue();
  });

  it('sets class name of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');
  });

  it('sets color of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');

    component.template.color = 'secondary';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-secondary');

    component.template.color = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');
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
});
