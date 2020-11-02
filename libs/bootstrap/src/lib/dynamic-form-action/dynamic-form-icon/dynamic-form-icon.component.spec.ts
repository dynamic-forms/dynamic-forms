import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormAction, DynamicFormActionService, DynamicFormField,
  DynamicFormIconDefinition, DynamicFormIconTemplate, DynamicFormLibraryService } from '@dynamic-forms/core';
import { BsDynamicFormIconComponent } from './dynamic-form-icon.component';
import { BsDynamicFormIconModule } from './dynamic-form-icon.module';

describe('BsDynamicFormIconComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormIconComponent>;
  let component: BsDynamicFormIconComponent;
  let element: DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormIconModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormIconComponent);
    component = fixture.componentInstance;

    const root = <DynamicForm>{};
    const parent = <DynamicFormField>{};
    const template = <DynamicFormIconTemplate>{ label: 'label', icon: 'icon' };
    const definition = <DynamicFormIconDefinition>{ id: 'id', type: 'element', template };
    element = new DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>(root, parent, definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.template.label).toBe('label');
  });

  it('creates component template', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formIconDebugElement = formButtonDebugElement.query(By.css('i.material-icons'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;
    const formIconElement = <HTMLElement>formIconDebugElement.nativeElement;

    expect(formButtonElement).toBeDefined();
    expect(formButtonElement.id).toBe('id');
    expect(formButtonElement.type).toBe('button');
    expect(formIconElement.innerText).toBe('icon');
  });

  it('sets dynamic form icon to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary hidden');
  });

  it('sets class name of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon btn btn-outline-primary');
  });

  it('sets type of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
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
