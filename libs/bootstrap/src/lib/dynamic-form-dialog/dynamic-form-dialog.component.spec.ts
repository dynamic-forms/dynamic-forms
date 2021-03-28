import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormAction, DynamicFormActionBase, DynamicFormActionService,
  DynamicFormComponentFactory, DynamicFormConfigService, DynamicFormLibraryService,
  DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { of } from 'rxjs';
import { BsDynamicFormDialogComponent } from './dynamic-form-dialog.component';
import { BsDynamicFormDialogModule } from './dynamic-form-dialog.module';

@Component({
  selector: 'bs-dynamic-form-action-test',
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

describe('BsDynamicFormDialogComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormDialogComponent>;
  let component: BsDynamicFormDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormActionComponentTestModule,
        BsDynamicFormDialogModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormDialogComponent);
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

    it('renders component template', () => {
      const debugElement = fixture.debugElement.query(By.css('.dynamic-form-modal'));

      expect(debugElement).toBeNull();
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
      const debugElement = fixture.debugElement.query(By.css('.dynamic-form-modal.modal'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog.modal-dialog-centered.modal-dialog-scrollable'));
      const contentDebugElement = dialogDebugElement.query(By.css('.modal-content'));

      const bodyDebugElement = contentDebugElement.query(By.css('.modal-body'));
      const headerDebugElement = contentDebugElement.query(By.css('.modal-header'));
      const footerDebugElement = contentDebugElement.query(By.css('.modal-footer'));

      expect(debugElement).toBeTruthy();
      expect(dialogDebugElement).toBeTruthy();
      expect(contentDebugElement).toBeTruthy();

      expect(bodyDebugElement).toBeTruthy();
      expect(headerDebugElement).toBeNull();
      expect(footerDebugElement).toBeNull();
    });

    it('renders title', () => {
      component.title = 'Title';

      fixture.detectChanges();

      const contentDebugElement = fixture.debugElement.query(By.css('.modal-content'));
      const headerDebugElement = contentDebugElement.query(By.css('.modal-header'));
      const titleDebugElement = headerDebugElement.query(By.css('.modal-title'));
      const titleElement = titleDebugElement.nativeElement as HTMLElement;

      expect(titleDebugElement).toBeTruthy();
      expect(titleElement.innerText).toBe('Title');
    });

    it('renders title html', () => {
      component.titleHtml = '<b>Title</b>';

      fixture.detectChanges();

      const contentDebugElement = fixture.debugElement.query(By.css('.modal-content'));
      const headerDebugElement = contentDebugElement.query(By.css('.modal-header'));
      const titleDebugElement = headerDebugElement.query(By.css('.modal-title'));
      const titleElement = titleDebugElement.nativeElement as HTMLElement;

      expect(titleDebugElement).toBeTruthy();
      expect(titleElement.innerHTML).toBe('<b>Title</b>');
    });

    it('renders header actions', () => {
      component.headerActions = [
        { classType: 'action', componentType: 'action' } as DynamicFormAction
      ];

      fixture.detectChanges();

      const contentDebugElement = fixture.debugElement.query(By.css('.modal-content'));
      const headerDebugElement = contentDebugElement.query(By.css('.modal-header'));
      const toolbarDebugElement = headerDebugElement.query(By.css('.modal-toolbar'));

      expect(toolbarDebugElement).toBeTruthy();
    });

    it('renders footer actions', () => {
      component.footerActions = [
        { classType: 'action', componentType: 'action' } as DynamicFormAction
      ];

      fixture.detectChanges();

      const contentDebugElement = fixture.debugElement.query(By.css('.modal-content'));
      const footerDebugElement = contentDebugElement.query(By.css('.modal-footer'));

      expect(footerDebugElement).toBeTruthy();
    });

    it('renders class names', () => {
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

      const debugElement = fixture.debugElement.query(By.css('.dynamic-form-modal.modal.class-form'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog.modal-dialog-centered.modal-dialog-scrollable.class-modal'));
      const contentDebugElement = dialogDebugElement.query(By.css('.modal-content'));

      const bodyDebugElement = contentDebugElement.query(By.css('.modal-body.class-children'));
      const headerDebugElement = contentDebugElement.query(By.css('.modal-header.class-header'));
      const footerDebugElement = contentDebugElement.query(By.css('.modal-footer.class-footer'));

      const titleDebugElement = headerDebugElement.query(By.css('.modal-title.class-title'));
      const toolbarDebugElement = headerDebugElement.query(By.css('.modal-toolbar'));

      expect(debugElement).toBeTruthy();
      expect(dialogDebugElement).toBeTruthy();
      expect(contentDebugElement).toBeTruthy();

      expect(bodyDebugElement).toBeTruthy();
      expect(headerDebugElement).toBeTruthy();
      expect(footerDebugElement).toBeTruthy();

      expect(titleDebugElement).toBeTruthy();
      expect(toolbarDebugElement).toBeTruthy();
    });
  });

  describe('opened maximized', () => {
    beforeEach(() => {
      component.isOpen$ = of(true);
      component.maximized = true;
      fixture.detectChanges();
    });

    it('renders maximized class names', () => {
      const debugElement = fixture.debugElement.query(By.css('.modal.maximized'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog.maximized'));

      expect(debugElement).toBeTruthy();
      expect(dialogDebugElement).toBeTruthy();
    });

    it('updates size', () => {
      const debugElement = fixture.debugElement.query(By.css('.modal'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog'));
      const contentDebugElement = dialogDebugElement.query(By.css('.modal-content'));

      const dialogElement = dialogDebugElement.nativeElement as HTMLElement;
      const contentElement = contentDebugElement.nativeElement as HTMLElement;

      expect(dialogElement.style.width).toBe('100%');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('100%');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('100%');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('100%');
      expect(contentElement.style.minHeight).toBe('100%');
      expect(contentElement.style.maxHeight).toBe('100%');

      component.maximized = false;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('');
      expect(dialogElement.style.minHeight).toBe('');
      expect(dialogElement.style.maxWidth).toBe('');
      expect(dialogElement.style.maxHeight).toBe('');
      expect(dialogElement.style.margin).toBe('');
      expect(contentElement.style.height).toBe('');
      expect(contentElement.style.minHeight).toBe('');
      expect(contentElement.style.maxHeight).toBe('100%');

      component.maximized = true;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('100%');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('100%');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('100%');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('100%');
      expect(contentElement.style.minHeight).toBe('100%');
      expect(contentElement.style.maxHeight).toBe('100%');
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
      const debugElement = fixture.debugElement.query(By.css('.modal'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog'));
      const contentDebugElement = dialogDebugElement.query(By.css('.modal-content'));

      const dialogElement = dialogDebugElement.nativeElement as HTMLElement;
      const contentElement = contentDebugElement.nativeElement as HTMLElement;

      expect(dialogElement.style.width).toBe('100%');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('100%');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('100%');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('100%');
      expect(contentElement.style.minHeight).toBe('100%');
      expect(contentElement.style.maxHeight).toBe('100%');

      component.maximized = false;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('600px');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('');
      expect(dialogElement.style.minHeight).toBe('');
      expect(dialogElement.style.maxWidth).toBe('');
      expect(dialogElement.style.maxHeight).toBe('');
      expect(dialogElement.style.margin).toBe('');
      expect(contentElement.style.height).toBe('400px');
      expect(contentElement.style.minHeight).toBe('');
      expect(contentElement.style.maxHeight).toBe('100%');

      component.maximized = true;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('100%');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('100%');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('100%');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('100%');
      expect(contentElement.style.minHeight).toBe('100%');
      expect(contentElement.style.maxHeight).toBe('100%');
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
      const debugElement = fixture.debugElement.query(By.css('.modal'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog'));
      const contentDebugElement = dialogDebugElement.query(By.css('.modal-content'));

      const dialogElement = dialogDebugElement.nativeElement as HTMLElement;
      const contentElement = contentDebugElement.nativeElement as HTMLElement;

      expect(dialogElement.style.width).toBe('100%');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('100%');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('100%');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('100%');
      expect(contentElement.style.minHeight).toBe('100%');
      expect(contentElement.style.maxHeight).toBe('100%');

      component.maximized = false;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('600px');
      expect(dialogElement.style.minHeight).toBe('');
      expect(dialogElement.style.maxWidth).toBe('');
      expect(dialogElement.style.maxHeight).toBe('');
      expect(dialogElement.style.margin).toBe('');
      expect(contentElement.style.height).toBe('');
      expect(contentElement.style.minHeight).toBe('400px');
      expect(contentElement.style.maxHeight).toBe('100%');

      component.maximized = true;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('100%');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('100%');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('100%');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('100%');
      expect(contentElement.style.minHeight).toBe('100%');
      expect(contentElement.style.maxHeight).toBe('100%');
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
      const debugElement = fixture.debugElement.query(By.css('.modal'));
      const dialogDebugElement = debugElement.query(By.css('.modal-dialog'));
      const contentDebugElement = dialogDebugElement.query(By.css('.modal-content'));

      const dialogElement = dialogDebugElement.nativeElement as HTMLElement;
      const contentElement = contentDebugElement.nativeElement as HTMLElement;

      expect(dialogElement.style.width).toBe('calc(100% - 20px)');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('calc(100% - 20px)');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('calc(100% - 20px)');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('calc(100% - 20px)');
      expect(contentElement.style.minHeight).toBe('calc(100% - 20px)');
      expect(contentElement.style.maxHeight).toBe('calc(100% - 20px)');

      component.maximized = false;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('');
      expect(dialogElement.style.minHeight).toBe('');
      expect(dialogElement.style.maxWidth).toBe('calc(100% - 20px)');
      expect(dialogElement.style.maxHeight).toBe('');
      expect(dialogElement.style.margin).toBe('');
      expect(contentElement.style.height).toBe('');
      expect(contentElement.style.minHeight).toBe('');
      expect(contentElement.style.maxHeight).toBe('calc(100% - 20px)');

      component.maximized = true;

      fixture.detectChanges();

      expect(dialogElement.style.width).toBe('calc(100% - 20px)');
      expect(dialogElement.style.height).toBe('');
      expect(dialogElement.style.minWidth).toBe('calc(100% - 20px)');
      expect(dialogElement.style.minHeight).toBe('100%');
      expect(dialogElement.style.maxWidth).toBe('calc(100% - 20px)');
      expect(dialogElement.style.maxHeight).toBe('100%');
      expect(dialogElement.style.margin).toBe('0px auto');
      expect(contentElement.style.height).toBe('calc(100% - 20px)');
      expect(contentElement.style.minHeight).toBe('calc(100% - 20px)');
      expect(contentElement.style.maxHeight).toBe('calc(100% - 20px)');
    });
  });
});
