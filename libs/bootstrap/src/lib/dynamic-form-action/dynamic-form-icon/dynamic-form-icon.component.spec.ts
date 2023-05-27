import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormAction, DynamicFormActionService, DynamicFormActionType, DynamicFormBuilder,
  DynamicFormColorService, DynamicFormField, DynamicFormIconDefinition, DynamicFormIconService, DynamicFormIconTemplate,
  DynamicFormLibraryService } from '@dynamic-forms/core';
import { BsDynamicFormIconComponent } from './dynamic-form-icon.component';

describe('BsDynamicFormIconComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormIconComponent>;
  let component: BsDynamicFormIconComponent;
  let element: DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormIconComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormActionService,
        DynamicFormColorService,
        DynamicFormIconService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormIconComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const template = { label: 'label', icon: 'icon' } as DynamicFormIconTemplate;
    const definition = { id: 'id', type: 'element', template } as DynamicFormIconDefinition;
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
    const formIconDebugElement = formButtonDebugElement.query(By.css('i.material-icons'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;
    const formIconElement = formIconDebugElement.nativeElement as HTMLElement;

    expect(formButtonElement).toBeTruthy();
    expect(formButtonElement.id).toBe('id');
    expect(formButtonElement.type).toBe('button');
    expect(formIconElement.innerText).toBe('icon');
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

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');
  });

  it('sets color of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');

    component.template.color = 'secondary';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-secondary');

    component.template.color = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');
  });

  it('sets type of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement  as HTMLButtonElement;

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
