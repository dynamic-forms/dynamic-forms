import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '@dynamic-forms/core';
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
  });

  it('creates component', () => {
    expect(component).toBeDefined();
  });
});
