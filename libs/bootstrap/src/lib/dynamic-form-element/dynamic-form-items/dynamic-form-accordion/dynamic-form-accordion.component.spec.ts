import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormItems, DynamicFormLibraryService } from '@dynamic-forms/core';
import { BsDynamicFormAccordionComponent } from './dynamic-form-accordion.component';
import { BsDynamicFormAccordionModule } from './dynamic-form-accordion.module';

describe('BsDynamicFormAccordionComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormAccordionComponent>;
  let component: BsDynamicFormAccordionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormAccordionModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormAccordionComponent);
    component = fixture.componentInstance;
    component.element = new DynamicFormItems({ template: {}, children: [] });

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
