import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormAction, DynamicFormActionService, DynamicFormBuilder,
  DynamicFormField, DynamicFormIconDefinition, DynamicFormIconTemplate,
  DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormIconComponent } from './dynamic-form-icon.component';
import { MatDynamicFormIconModule } from './dynamic-form-icon.module';

describe('MatDynamicFormIconComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormIconComponent>;
  let component: MatDynamicFormIconComponent;
  let element: DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormIconModule,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormActionService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormIconComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const template = { label: 'label' } as DynamicFormIconTemplate;
    const definition = { id: 'id', type: 'element', template } as DynamicFormIconDefinition;
    element = new DynamicFormAction<DynamicFormIconTemplate, DynamicFormIconDefinition>(builder, root, parent, definition);
    component.element = element;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.template.label).toBe('label');
  });

  it('renders component template', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement).toBeTruthy();
    expect(formButtonElement.id).toBe('id');
    expect(formButtonElement.type).toBe('button');
  });

  it('sets dynamic form icon to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe(
      'mat-focus-indicator mat-tooltip-trigger dynamic-form-icon mat-icon-button mat-button-base mat-primary',
    );

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe(
      'mat-focus-indicator mat-tooltip-trigger dynamic-form-icon mat-icon-button mat-button-base mat-primary hidden',
    );
  });

  it('sets class name of dynamic form icon', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-icon'));
    const formButtonElement = formButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(formButtonElement.className).toBe(
      'mat-focus-indicator mat-tooltip-trigger dynamic-form-icon mat-icon-button mat-button-base mat-primary',
    );

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe(
      'mat-focus-indicator mat-tooltip-trigger dynamic-form-icon mat-icon-button mat-button-base mat-primary className1 className2',
    );

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe(
      'mat-focus-indicator mat-tooltip-trigger dynamic-form-icon mat-icon-button mat-button-base mat-primary',
    );
  });
});
