import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormItems, DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';
import { MatDynamicFormAccordionModule } from './dynamic-form-accordion.module';

describe('MatDynamicFormAccordionComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormAccordionComponent>;
  let component: MatDynamicFormAccordionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormAccordionModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormAccordionComponent);
    component = fixture.componentInstance;
    component.element = new DynamicFormItems({ template: {}, items: [] });

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeDefined();
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
