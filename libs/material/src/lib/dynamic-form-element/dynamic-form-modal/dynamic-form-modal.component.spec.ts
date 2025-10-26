import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormElement,
  DynamicFormElementType,
  DynamicFormLibraryService,
  DynamicFormModal,
  DynamicFormModalDefinition,
} from '@dynamic-forms/core';
import { MatDynamicFormModalComponent } from './dynamic-form-modal.component';

describe('MatDynamicFormModalComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormModalComponent>;
  let component: MatDynamicFormModalComponent;
  let builder: DynamicFormBuilder;
  let modal: DynamicFormModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
      ],
    });

    builder = {} as any;

    modal = new DynamicFormModal(
      builder,
      { template: {} } as DynamicForm,
      {} as DynamicFormElement,
      {
        template: {
          title: 'Title',
          width: '800px',
          height: '500px',
          minWidth: '800px',
          minHeight: '500px',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      } as DynamicFormModalDefinition,
      {} as DynamicFormElementType,
    );

    fixture = TestBed.createComponent(MatDynamicFormModalComponent);
    component = fixture.componentInstance;
    component.element = modal;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
  });

  it('opens modal', waitForAsync(() => {
    modal.open();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formWrapperElement = document.querySelector('.dynamic-form-wrapper');
      const formElement = formWrapperElement.querySelector('div.dynamic-form');
      const modalElement = formElement.querySelector('div.dynamic-form-modal');
      const modalHeaderElement = modalElement.querySelector<HTMLElement>('div.modal-header');
      const modalBodyElement = modalElement.querySelector('.modal-body');

      expect(component.isOpen).toBeTrue();
      expect(formWrapperElement).toBeTruthy();
      expect(modalElement).toBeTruthy();
      expect(modalHeaderElement).toBeTruthy();
      expect(modalHeaderElement.innerText).toBe('Title');
      expect(modalBodyElement).toBeTruthy();
    });
  }));

  it('closes modal', waitForAsync(() => {
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

  it('toggles modal', waitForAsync(() => {
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
