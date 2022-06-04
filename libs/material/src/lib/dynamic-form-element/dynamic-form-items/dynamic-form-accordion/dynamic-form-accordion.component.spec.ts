import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormElement,
  DynamicFormItems, DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';
import { MatDynamicFormAccordionModule } from './dynamic-form-accordion.module';

describe('MatDynamicFormAccordionComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormAccordionComponent>;
  let component: MatDynamicFormAccordionComponent;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormAccordionModule,
      ],
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
    const element = new DynamicFormItems(builder, root, parent, { template: {}, children: [] });

    fixture = TestBed.createComponent(MatDynamicFormAccordionComponent);
    component = fixture.componentInstance;
    component.element = element;

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

    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-accordion'));
    const element = debugElement.nativeElement;

    expect(element).toBeTruthy();
  });
});
