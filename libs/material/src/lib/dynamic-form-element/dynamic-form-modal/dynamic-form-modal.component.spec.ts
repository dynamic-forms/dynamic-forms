import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormLibraryService, DynamicFormModal, DynamicFormModalDefinition, DynamicFormModalTemplate } from '@dynamic-forms/core';
import { MatDynamicFormModalComponent } from './dynamic-form-modal.component';
import { MatDynamicFormModalModule } from './dynamic-form-modal.module';

describe('MatDynamicFormModalComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormModalComponent>;
  let component: MatDynamicFormModalComponent;
  let modal: DynamicFormModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDynamicFormModalModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormModalComponent);
    component = fixture.componentInstance;

    const template = <DynamicFormModalTemplate>{
      title: 'Title',
      width: '800px',
      minWidth: '800px',
      maxWidth: '100%'
    };
    const root = <DynamicForm>{};
    modal = new DynamicFormModal(root, <DynamicFormModalDefinition>{ template });
    component.element = modal;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
  });

  it('opens modal', async(() => {
    modal.open();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formWrapperElement = document.querySelector('.dynamic-form-wrapper');
      const formElement = <HTMLDivElement>formWrapperElement.querySelector('div.dynamic-form');
      const modalElement = <HTMLDivElement>formElement.querySelector('div.dynamic-form-modal');
      const modalHeaderElement = <HTMLDivElement>modalElement.querySelector('div.modal-header');
      const modalBodyElement = <HTMLDivElement>modalElement.querySelector('div.modal-body');

      expect(component.isOpen).toBeTrue();
      expect(formWrapperElement).toBeTruthy();
      expect(modalElement).toBeTruthy();
      expect(modalHeaderElement).toBeTruthy();
      expect(modalHeaderElement.innerText).toBe('Title');
      expect(modalBodyElement).toBeTruthy();
    });
  }));

  it('closes modal', async(() => {
    modal.open();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isOpen).toBeTrue();

      modal.close();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.isOpen).toBeFalse();
      });
    });
  }));

  it('toggles modal', async(() => {
    modal.toggle();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isOpen).toBeTrue();

      modal.toggle();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.isOpen).toBeFalse();
      });
    });
  }));
});
