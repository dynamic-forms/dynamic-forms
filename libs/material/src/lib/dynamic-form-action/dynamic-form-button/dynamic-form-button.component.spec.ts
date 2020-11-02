import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormAction, DynamicFormActionService, DynamicFormButtonDefinition,
  DynamicFormButtonTemplate, DynamicFormField, DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormButtonComponent } from './dynamic-form-button.component';
import { MatDynamicFormButtonModule } from './dynamic-form-button.module';

describe('MatDynamicFormButtonComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormButtonComponent>;
  let component: MatDynamicFormButtonComponent;
  let element: DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormButtonModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormActionService
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormButtonComponent);
    component = fixture.componentInstance;

    const root = <DynamicForm>{};
    const parent = <DynamicFormField>{};
    const template = <DynamicFormButtonTemplate>{ label: 'label' };
    const definition = <DynamicFormButtonDefinition>{ id: 'id', type: 'element', template };
    element = new DynamicFormAction<DynamicFormButtonTemplate, DynamicFormButtonDefinition>(root, parent, definition);
    component.element = element;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component.element).toBe(element);
    expect(component.template.label).toBe('label');
  });

  it('creates component template', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement).toBeDefined();
    expect(formButtonElement.id).toBe('id');
    expect(formButtonElement.type).toBe('button');
    expect(formButtonElement.innerText).toBe('label');
  });

  it('sets dynamic form button to hidden', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('mat-focus-indicator dynamic-form-button mat-flat-button mat-button-base mat-primary');

    component.template.hidden = true;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('mat-focus-indicator dynamic-form-button mat-flat-button mat-button-base mat-primary hidden');
  });

  it('sets class name of dynamic form button', () => {
    const formButtonDebugElement = fixture.debugElement.query(By.css('button.dynamic-form-button'));
    const formButtonElement = <HTMLButtonElement>formButtonDebugElement.nativeElement;

    expect(formButtonElement.className).toBe('mat-focus-indicator dynamic-form-button mat-flat-button mat-button-base mat-primary');

    component.template.className = 'className1 className2';
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('mat-focus-indicator dynamic-form-button mat-flat-button mat-button-base mat-primary className1 className2');

    component.template.className = null;
    fixture.detectChanges();

    expect(formButtonElement.className).toBe('mat-focus-indicator dynamic-form-button mat-flat-button mat-button-base mat-primary');
  });
});
