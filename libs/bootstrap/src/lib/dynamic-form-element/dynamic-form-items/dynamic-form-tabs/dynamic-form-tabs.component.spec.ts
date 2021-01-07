import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '@dynamic-forms/core';
import { BsDynamicFormTabsComponent } from './dynamic-form-tabs.component';
import { BsDynamicFormTabsModule } from './dynamic-form-tabs.module';

describe('BsDynamicFormTabsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormTabsComponent>;
  let component: BsDynamicFormTabsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormTabsModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormTabsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeDefined();
  });
});
