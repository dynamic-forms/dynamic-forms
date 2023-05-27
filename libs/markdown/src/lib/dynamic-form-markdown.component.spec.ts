import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormElement, DynamicFormElementType } from '@dynamic-forms/core';
import { of } from 'rxjs';
import { DynamicFormMarkdownDefinition } from './dynamic-form-markdown-definition';
import { DynamicFormMarkdownTemplate } from './dynamic-form-markdown-template';
import { DynamicFormMarkdownComponent } from './dynamic-form-markdown.component';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

describe('DynamicFormMarkdownComponent', () => {
  let service: jasmine.SpyObj<DynamicFormMarkdownService>;
  let builder: DynamicFormBuilder;
  let fixture: ComponentFixture<DynamicFormMarkdownComponent>;
  let component: DynamicFormMarkdownComponent;
  let element: DynamicFormElement<DynamicFormMarkdownTemplate, DynamicFormMarkdownDefinition>;

  beforeEach(() => {
    service = jasmine.createSpyObj<DynamicFormMarkdownService>('service', [ 'compile', 'compileFromSource' ]);
    builder = {} as any;

    TestBed.configureTestingModule({
      imports: [
        DynamicFormMarkdownComponent,
      ],
      providers: [
        {
          provide: DynamicFormMarkdownService,
          useValue: service,
        },
      ],
    });

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = {} as DynamicFormMarkdownTemplate;
    const definition = { type: 'element', template } as DynamicFormMarkdownDefinition;
    const type = {} as DynamicFormElementType;
    element = new DynamicFormElement<DynamicFormMarkdownTemplate, DynamicFormMarkdownDefinition>(builder, root, parent, definition, type);

    fixture = TestBed.createComponent(DynamicFormMarkdownComponent);
    component = fixture.componentInstance;
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
  });

  it('renders component template', () => {
    service.compile.and.returnValue(undefined);

    const formMarkdownDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-markdown'));
    const formMarkdownElement = formMarkdownDebugElement.nativeElement as HTMLElement;

    expect(formMarkdownElement).toBeTruthy();
    expect(formMarkdownElement.innerHTML).toBe('');
    expect(service.compile).toHaveBeenCalledWith(undefined, undefined);
  });

  it('renders component template for markdown', () => {
    service.compile.and.returnValue('<h1>Title</h1>');

    component.element.template.markdown = '# Title';

    fixture.detectChanges();

    const formMarkdownDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-markdown'));
    const formMarkdownElement = formMarkdownDebugElement.nativeElement as HTMLElement;

    expect(formMarkdownElement).toBeTruthy();
    expect(formMarkdownElement.innerHTML).toBe('<h1>Title</h1>');
    expect(service.compile).toHaveBeenCalledWith('# Title', undefined);
  });

  it('renders component template for markdown source', waitForAsync(() => {
    service.compileFromSource.and.returnValue(of('<h1>Title</h1>'));

    component.element.template.source = '/assets/README.md';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formMarkdownDebugElement = fixture.debugElement.query(By.css('div.dynamic-form-markdown'));
      const formMarkdownElement = formMarkdownDebugElement.nativeElement as HTMLElement;

      expect(formMarkdownElement).toBeTruthy();
      expect(formMarkdownElement.innerHTML).toBe('<h1>Title</h1>');
      expect(service.compileFromSource).toHaveBeenCalledWith('/assets/README.md', undefined);
    });
  }));
});
