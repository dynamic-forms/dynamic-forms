import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormAction, DynamicFormActionService, DynamicFormButtonDefinition,
  DynamicFormButtonTemplate, DynamicFormField, DynamicFormLibraryService } from '@dynamic-forms/core';
import { BsDynamicFormButtonComponent } from './dynamic-form-button.component';
import { BsDynamicFormButtonModule } from './dynamic-form-button.module';

describe('BsDynamicFormButtonComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormButtonComponent>;
  let component: BsDynamicFormButtonComponent;
  let element: DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormButtonModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormButtonComponent);
    component = fixture.componentInstance;

    const root = <DynamicForm>{};
    const parent = <DynamicFormField>{};
    const template = <DynamicFormButtonTemplate>{ label: 'label' };
    const definition = <DynamicFormButtonDefinition>{ id: 'id', type: 'element', template };
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
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement).toBeDefined();
    expect(formButtonElement.id).toBe('id');
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerText).toBe('label');
  });

  it('sets dynamic form button to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary hidden');
  });

  it('sets class name of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-button btn btn-primary');
  });

  it('sets type of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

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
