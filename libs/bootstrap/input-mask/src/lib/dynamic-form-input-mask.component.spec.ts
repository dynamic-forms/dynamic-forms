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
import {
  DynamicFormInputMaskControl,
  DynamicFormInputMaskConverterService,
  DynamicFormInputMaskDefinition,
} from '@dynamic-forms/core/input-mask';
import { MockService } from 'ng-mocks';
import { BsDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

@Component({ selector: 'bs-dynamic-form-action-test', standalone: true, template: '' })
export class TestDynamicFormActionComponent {}

describe('BsDynamicFormInputMaskComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormInputMaskComponent>;
  let component: BsDynamicFormInputMaskComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormInputMaskDefinition;
  let formControl: DynamicFormInputMaskControl;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, BsDynamicFormInputMaskComponent],
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
        DynamicFormInputMaskConverterService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormInputMaskComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: { maskOptions: {} } } } as DynamicFormInputMaskDefinition;
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
