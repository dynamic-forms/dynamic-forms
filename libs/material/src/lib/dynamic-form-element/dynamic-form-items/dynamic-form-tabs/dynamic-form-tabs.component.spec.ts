import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';
import { MatDynamicFormTabsModule } from './dynamic-form-tabs.module';

describe('MatDynamicFormTabsComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormTabsComponent>;
  let component: MatDynamicFormTabsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTabsModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormTabsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeDefined();
  });
});
