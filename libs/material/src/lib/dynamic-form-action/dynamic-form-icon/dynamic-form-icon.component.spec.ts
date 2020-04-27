import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormAction, DynamicFormActionService, DynamicFormField, DynamicFormIconDefinition,
  DynamicFormIconTemplate, DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormIconComponent } from './dynamic-form-icon.component';

describe('MatDynamicFormIconComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormIconComponent>;
  let component: MatDynamicFormIconComponent;
  let element: DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatDynamicFormIconComponent
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormIconComponent);
    component = fixture.componentInstance;

    const root = <DynamicFormField>{};
    const parent = <DynamicFormField>{};
    const template = <DynamicFormIconTemplate>{ label: 'label' };
    const definition = <DynamicFormIconDefinition>{ type: 'element', template };
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
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement).toBeDefined();
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerHTML).toBe('label');
  });

  it('sets dynamic form icon to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-icon');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon hidden');
  });

  it('sets class name of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('dynamic-form-icon');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('dynamic-form-icon');
  });
});
