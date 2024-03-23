import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormConfigService,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { DynamicFormInputMaskControl, DynamicFormInputMaskDefinition } from '@dynamic-forms/core/input-mask';
import { MockService } from 'ng-mocks';
import { MatDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

@Component({ selector: 'mat-dynamic-form-action-test', standalone: true, template: '' })
export class TestDynamicFormActionComponent {}

describe('MatDynamicFormInputMaskComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormInputMaskComponent>;
  let component: MatDynamicFormInputMaskComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormInputMaskDefinition;
  let formControl: DynamicFormInputMaskControl;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDynamicFormInputMaskComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
        {
          provide: DynamicFormBuilder,
          useValue: builder,
        },
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormInputMaskComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormInputMaskDefinition;
    formControl = new DynamicFormInputMaskControl(builder, form, form, definition, {} as DynamicFormFieldType);

    component.field = formControl;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });
});
