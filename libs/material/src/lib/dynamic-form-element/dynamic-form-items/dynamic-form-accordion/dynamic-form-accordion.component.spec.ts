import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormElement,
  DynamicFormElementType,
  DynamicFormItems,
  DynamicFormLibraryService,
} from '@dynamic-forms/core';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

describe('MatDynamicFormAccordionComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormAccordionComponent>;
  let component: MatDynamicFormAccordionComponent;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
      ],
    });

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const items = new DynamicFormItems(builder, root, parent, { template: {}, children: [] }, {} as DynamicFormElementType);

    fixture = TestBed.createComponent(MatDynamicFormAccordionComponent);
    component = fixture.componentInstance;
    component.element = items;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders component template ', () => {
    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-accordion'));

    expect(debugElement).toBeTruthy();
  });

  it('renders class name', () => {
    component.element.template.className = 'class-name';

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-accordion.class-name'));
    const element = debugElement.nativeElement;

    expect(element).toBeTruthy();
  });
});
