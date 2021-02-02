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
});
