import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '@dynamic-forms/core';
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
  });

  it('creates component', () => {
    expect(component).toBeDefined();
  });
});
