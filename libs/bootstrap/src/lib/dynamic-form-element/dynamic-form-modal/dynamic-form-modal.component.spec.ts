import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService, DynamicFormModal, DynamicFormModalDefinition } from '@dynamic-forms/core';
import { BsDynamicFormModalComponent } from './dynamic-form-modal.component';
import { BsDynamicFormModalModule } from './dynamic-form-modal.module';

describe('BsDynamicFormModalComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormModalComponent>;
  let component: BsDynamicFormModalComponent;
  let modal: DynamicFormModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormModalModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormModalComponent);
    component = fixture.componentInstance;

    modal = new DynamicFormModal(<DynamicFormModalDefinition>{});
    component.element = modal;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
  });
});
