import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormLibraryService, DynamicFormToggle, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormToggleComponent } from './dynamic-form-toggle.component';
import { MatDynamicFormToggleModule } from './dynamic-form-toggle.module';

describe('MatDynamicFormToggleComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormToggleComponent>;
  let component: MatDynamicFormToggleComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormToggle>;
  let formControl: DynamicFormControl<DynamicFormToggle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormToggleModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormConfigService,
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormToggleComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormToggle>>{
      key: 'key',
      template: {
        input: {
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
            { value: 'value3', label: 'label3', disabled: true }
          ]
        }
      }
    };
    formControl = new DynamicFormControl<DynamicFormToggle>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('creates component template', () => {
    const toggleGroupDebugElement = fixture.debugElement.query(By.css('mat-button-toggle-group'));
    const toggleDebugElements = toggleGroupDebugElement.queryAll(By.css('mat-button-toggle'));
    const toggleComponents = toggleDebugElements.map(elem => <MatButtonToggle>elem.componentInstance);
    const toggleElements = toggleDebugElements.map(elem => elem.nativeElement);

    expect(toggleComponents.length).toBe(3);
    expect(toggleComponents[0].id).toBe('key-0');
    expect(toggleComponents[0].value).toBe('value1');
    expect(toggleComponents[1].id).toBe('key-1');
    expect(toggleComponents[1].value).toBe('value2');
    expect(toggleComponents[2].id).toBe('key-2');
    expect(toggleComponents[2].value).toBe('value3');
    expect(toggleElements.length).toBe(3);
    expect(toggleElements[0].innerText).toBe('label1');
    expect(toggleElements[1].innerText).toBe('label2');
    expect(toggleElements[2].innerText).toBe('label3');

  });
});
