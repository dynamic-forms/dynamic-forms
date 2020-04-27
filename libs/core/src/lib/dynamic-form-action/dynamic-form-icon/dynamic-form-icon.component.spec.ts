import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormIconDefinition } from './dynamic-form-icon-definition';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';
import { DynamicFormIconComponent } from './dynamic-form-icon.component';

describe('DynamicFormIconComponent', () => {
  let fixture: ComponentFixture<DynamicFormIconComponent>;
  let component: DynamicFormIconComponent;
  let element: DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormIconComponent
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormIconComponent);
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

  it('executes action onClick',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      spyOn(service, 'handle');

      const event = null;
      component.onClick(event);

      expect(service.handle).toHaveBeenCalledWith(component.element, event);
    })
  );
});
