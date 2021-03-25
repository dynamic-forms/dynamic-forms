import { Component, NgModule } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
  ]
})
class DynamicFormActionComponentTestModule {}

describe('MatDynamicFormDialogComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormDialogComponent>;
  let component: MatDynamicFormDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DynamicFormActionComponentTestModule,
        MatDynamicFormDialogModule
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormDialogComponent);
    component = fixture.componentInstance;
  });

  describe('closed', () => {
    beforeEach(() => {
      component.isOpen$ = of(false);
      fixture.detectChanges();
    });

    it('creates component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('opened', () => {
    beforeEach(() => {
      component.isOpen$ = of(true);
      fixture.detectChanges();
    });

    it('creates component', () => {
      expect(component).toBeTruthy();
    });

    it('renders component template', () => {
      const formWrapperElement = document.querySelector('.dynamic-form-wrapper');
      const formElement = formWrapperElement.querySelector('.dynamic-form');
      const modalElement = formElement.querySelector('.dynamic-form-modal');

      const bodyElement = modalElement.querySelector('.modal-body');
      const headerElement = modalElement.querySelector('.modal-header');
      const footerElement = modalElement.querySelector('.modal-footer');

      expect(formWrapperElement).toBeTruthy();
      expect(formElement).toBeTruthy();
      expect(modalElement).toBeTruthy();

      expect(bodyElement).toBeTruthy();
      expect(headerElement).toBeNull();
      expect(footerElement).toBeNull();
    });

    it('renders theme', waitForAsync(() => {
      component.theme = 'theme';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const formWrapperElement = document.querySelector('.dynamic-form-wrapper.theme');

        expect(formWrapperElement).toBeTruthy();
      });
    }));

    it('renders title', waitForAsync(() => {
      component.title = 'Title';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const headerElement = modalElement.querySelector('.modal-header');
        const titleElement = headerElement.querySelector('.modal-title') as HTMLElement;

        expect(titleElement.innerText).toBe('Title');
      });
    }));

    it('renders title html', waitForAsync(() => {
      component.titleHtml = '<b>Title</b>';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const headerElement = modalElement.querySelector('.modal-header');
        const titleElement = headerElement.querySelector('.modal-title') as HTMLElement;

        expect(titleElement.innerHTML).toBe('<b>Title</b>');
      });
    }));

    it('renders header actions', waitForAsync(() => {
      component.headerActions = [
        { classType: 'action', componentType: 'action' } as DynamicFormAction
      ];

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const headerElement = modalElement.querySelector('.modal-header');
        const toolbarDebugElement = headerElement.querySelector('.modal-toolbar');

        expect(toolbarDebugElement).toBeTruthy();
      });
    }));

    it('renders footer actions', waitForAsync(() => {
      component.footerActions = [
        { classType: 'action', componentType: 'action' } as DynamicFormAction
      ];

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const modalElement = document.querySelector('.dynamic-form-modal');
        const footerElement = modalElement.querySelector('.modal-footer');

        expect(footerElement).toBeTruthy();
      });
    }));

    it('renders class names', waitForAsync(() => {
      component.theme = 'theme';
      component.title = 'Title';
      component.headerActions = [
        { classType: 'action', componentType: 'action' } as DynamicFormAction
      ];
      component.footerActions = [
        { classType: 'action', componentType: 'action' } as DynamicFormAction
      ];

      component.classNameForm = 'class-form';
      component.classNameModal = 'class-modal';
      component.classNameChildren = 'class-children';
      component.classNameHeader = 'class-header';
      component.classNameFooter = 'class-footer';
      component.classNameTitle = 'class-title';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const formWrapperElement = document.querySelector('.dynamic-form-wrapper.theme');
        const formElement = formWrapperElement.querySelector('.dynamic-form.class-form');
        const modalElement = formElement.querySelector('.dynamic-form-modal.class-modal');

        const bodyElement = modalElement.querySelector('.modal-body.class-children');
        const headerElement = modalElement.querySelector('.modal-header.class-header');
        const footerElement = modalElement.querySelector('.modal-footer.class-footer');

        const titleElement = headerElement.querySelector('.modal-title.class-title');
        const toolbarElement = headerElement.querySelector('.modal-toolbar');

        expect(formWrapperElement).toBeTruthy();
        expect(formElement).toBeTruthy();
        expect(modalElement).toBeTruthy();

        expect(bodyElement).toBeTruthy();
        expect(headerElement).toBeTruthy();
        expect(footerElement).toBeTruthy();

        expect(titleElement).toBeTruthy();
        expect(toolbarElement).toBeTruthy();
      });
    }));
  });

  describe('opened maximized', () => {
    beforeEach(() => {
      component.isOpen$ = of(true);
      component.maximized = true;
      fixture.detectChanges();
    });

    it('renders maximized class names', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const formWrapperElement = document.querySelector('.dynamic-form-wrapper.maximized');
        const formElement = formWrapperElement.querySelector('.dynamic-form.maximized');
        const modalElement = formElement.querySelector('.dynamic-form-modal.maximized');

        const bodyElement = modalElement.querySelector('.modal-body.maximized');

        expect(formWrapperElement).toBeTruthy();
        expect(formElement).toBeTruthy();
        expect(modalElement).toBeTruthy();

        expect(bodyElement).toBeTruthy();
      });
    }));

    it('updates size', () => {
      const overlayElement = document.querySelector<HTMLElement>('.cdk-overlay-pane');

      expect(overlayElement.style.width).toBe('100%');
      expect(overlayElement.style.height).toBe('100%');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = false;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('');
      expect(overlayElement.style.height).toBe('');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = true;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('100%');
      expect(overlayElement.style.height).toBe('100%');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');
    });
  });

  describe('opened maximized with size', () => {
    beforeEach(() => {
      component.isOpen$ = of(true);
      component.width = '600px';
      component.height = '400px';
      component.maximized = true;
      fixture.detectChanges();
    });

    it('updates size', () => {
      const overlayElement = document.querySelector<HTMLElement>('.cdk-overlay-pane');

      expect(overlayElement.style.width).toBe('100%');
      expect(overlayElement.style.height).toBe('100%');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = false;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('600px');
      expect(overlayElement.style.height).toBe('400px');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = true;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('100%');
      expect(overlayElement.style.height).toBe('100%');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');
    });
  });

  describe('opened maximized with min size', () => {
    beforeEach(() => {
      component.isOpen$ = of(true);
      component.minWidth = '600px';
      component.minHeight = '400px';
      component.maximized = true;
      fixture.detectChanges();
    });

    it('updates size', () => {
      const overlayElement = document.querySelector<HTMLElement>('.cdk-overlay-pane');

      expect(overlayElement.style.width).toBe('100%');
      expect(overlayElement.style.height).toBe('100%');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = false;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('');
      expect(overlayElement.style.height).toBe('');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = true;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('100%');
      expect(overlayElement.style.height).toBe('100%');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('100%');
      expect(overlayElement.style.maxHeight).toBe('');
    });
  });

  describe('opened maximized with max size', () => {
    beforeEach(() => {
      component.isOpen$ = of(true);
      component.maxWidth = 'calc(100% - 20px)';
      component.maxHeight = 'calc(100% - 20px)';
      component.maximized = true;
      fixture.detectChanges();
    });

    it('updates size', () => {
      const overlayElement = document.querySelector<HTMLElement>('.cdk-overlay-pane');

      expect(overlayElement.style.width).toBe('calc(100% - 20px)');
      expect(overlayElement.style.height).toBe('calc(100% - 20px)');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('calc(100% - 20px)');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = false;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('');
      expect(overlayElement.style.height).toBe('');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('calc(100% - 20px)');
      expect(overlayElement.style.maxHeight).toBe('');

      component.maximized = true;
      component.ngOnChanges({ maximized: {} as any });

      fixture.detectChanges();

      expect(overlayElement.style.width).toBe('calc(100% - 20px)');
      expect(overlayElement.style.height).toBe('calc(100% - 20px)');
      expect(overlayElement.style.minWidth).toBe('');
      expect(overlayElement.style.minHeight).toBe('');
      expect(overlayElement.style.maxWidth).toBe('calc(100% - 20px)');
      expect(overlayElement.style.maxHeight).toBe('');
    });
  });
});
