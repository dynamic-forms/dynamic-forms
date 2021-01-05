import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormAction, DynamicFormActionBase, DynamicFormActionService,
  DynamicFormComponentFactory, DynamicFormConfigService, DynamicFormLibraryService,
  DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { of } from 'rxjs';
import { MatDynamicFormDialogComponent } from './dynamic-form-dialog.component';
import { MatDynamicFormDialogModule } from './dynamic-form-dialog.module';

@Component({
  selector: 'mat-dynamic-form-action-test',
  template: `<div>Dynamic Form Action</div>`
})
class DynamicFormActionTestComponent extends DynamicFormActionBase {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

@NgModule({
  declarations: [
    DynamicFormActionTestComponent
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' })
    },
    {
      provide: DYNAMIC_FORM_ACTION_TYPE_CONFIG,
      useValue: [
        { libraryName: 'test', type: 'action', component: DynamicFormActionTestComponent }
      ]
    },
    DynamicFormConfigService,
    {
      provide: DynamicFormActionService,
      useValue: {}
    },
    DynamicFormComponentFactory
  ],
  entryComponents: [
    DynamicFormActionTestComponent
  ]
})
class DynamicFormActionComponentTestModule {}

describe('MatDynamicFormDialogComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormDialogComponent>;
  let component: MatDynamicFormDialogComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DynamicFormActionComponentTestModule,
        MatDynamicFormDialogModule
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormDialogComponent);
    component = fixture.componentInstance;
  }));

  describe('closed', () => {
    beforeEach(async(() => {
      component.isOpen$ = of(false);
      fixture.detectChanges();
    }));

    it('creates component', () => {
      expect(component).toBeDefined();
    });

    xit('renders component template', () => {
      const formWrapperElement = document.querySelector('.dynamic-form-wrapper');

      expect(formWrapperElement).toBeNull();
    });
  });

  describe('opened', () => {
    beforeEach(async(() => {
      component.isOpen$ = of(true);
      fixture.detectChanges();
    }));

    it('creates component', () => {
      expect(component).toBeDefined();
    });

    it('renders component template', () => {
      const formWrapperElement = document.querySelector('.dynamic-form-wrapper');
      const formElement = formWrapperElement.querySelector('.dynamic-form');
      const modalElement = formElement.querySelector('.dynamic-form-modal');

      const bodyElement = modalElement.querySelector('.modal-body');
      const headerElement = modalElement.querySelector('.modal-header');
      const footerElement = modalElement.querySelector('.modal-footer');

      expect(formWrapperElement).toBeDefined();
      expect(formElement).toBeDefined();
      expect(modalElement).toBeDefined();

      expect(bodyElement).toBeDefined();
      expect(headerElement).toBeNull();
      expect(footerElement).toBeNull();
    });

    it('renders theme', async(() => {
      component.theme = 'theme';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const formWrapperElement = document.querySelector('.dynamic-form-wrapper.theme');

        expect(formWrapperElement).toBeDefined();
      });
    }));

    it('renders title', async(() => {
      component.title = 'Title';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const headerElement = modalElement.querySelector('.modal-header');
        const titleElement = <HTMLElement>headerElement.querySelector('.modal-title');

        expect(titleElement.innerText).toBe('Title');
      });
    }));

    it('renders title html', async(() => {
      component.titleHtml = '<b>Title</b>';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const headerElement = modalElement.querySelector('.modal-header');
        const titleElement = <HTMLElement>headerElement.querySelector('.modal-title');

        expect(titleElement.innerHTML).toBe('<b>Title</b>');
      });
    }));

    it('renders header actions', async(() => {
      component.headerActions = [
        <DynamicFormAction>{ classType: 'action', componentType: 'action' }
      ];

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const headerElement = modalElement.querySelector('.modal-header');
        const toolbarDebugElement = headerElement.querySelector('.modal-toolbar');

        expect(toolbarDebugElement).toBeDefined();
      });
    }));

    it('renders footer actions', async(() => {
      component.footerActions = [
        <DynamicFormAction>{ classType: 'action', componentType: 'action' }
      ];

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const footerElement = modalElement.querySelector('.modal-footer');

        expect(footerElement).toBeDefined();
      });
    }));

    it('renders class names', async(() => {
      component.theme = 'theme';
      component.title = 'Title';
      component.headerActions = [
        <DynamicFormAction>{ classType: 'action', componentType: 'action' }
      ];
      component.footerActions = [
        <DynamicFormAction>{ classType: 'action', componentType: 'action' }
      ];

      component.classNameForm = 'class-form';
      component.classNameModal = 'class-modal';
      component.classNameElements = 'class-elements';
      component.classNameHeader = 'class-header';
      component.classNameFooter = 'class-footer';
      component.classNameTitle = 'class-title';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const formWrapperElement = document.querySelector('.dynamic-form-wrapper.theme');
        const formElement = formWrapperElement.querySelector('.dynamic-form.class-form');
        const modalElement = formElement.querySelector('.dynamic-form-modal.class-modal');

        const bodyElement = modalElement.querySelector('.modal-body.class-elements');
        const headerElement = modalElement.querySelector('.modal-header.class-header');
        const footerElement = modalElement.querySelector('.modal-footer.class-footer');

        const titleElement = headerElement.querySelector('.modal-header.class-title');
        const toolbarElement = headerElement.querySelector('.modal-toolbar');

        expect(formWrapperElement).toBeDefined();
        expect(formElement).toBeDefined();
        expect(modalElement).toBeDefined();

        expect(bodyElement).toBeDefined();
        expect(headerElement).toBeDefined();
        expect(footerElement).toBeDefined();

        expect(titleElement).toBeDefined();
        expect(toolbarElement).toBeDefined();
      });
    }));
  });
});
