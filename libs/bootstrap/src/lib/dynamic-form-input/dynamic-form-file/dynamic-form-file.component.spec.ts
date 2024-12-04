import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  DynamicForm,
  DynamicFormAction,
  DynamicFormBuilder,
  DynamicFormComponentFactory,
  DynamicFormConfigService,
  DynamicFormControl,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormFile,
  DynamicFormFileControl,
  DynamicFormFileDefinition,
  DynamicFormFileValue,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { BsDynamicFormFileComponent } from './dynamic-form-file.component';

@Component({ selector: 'bs-dynamic-form-action-test', template: '' })
export class TestDynamicFormActionComponent {}

describe('BsDynamicFormFileComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormFileComponent>;
  let component: BsDynamicFormFileComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormFileDefinition;
  let formControl: DynamicFormFileControl;
  let uploadAction: DynamicFormAction;

  beforeEach(() => {
    uploadAction = { type: { component: TestDynamicFormActionComponent } } as DynamicFormAction;
    builder = MockService(DynamicFormBuilder, {
      createFormAction: () => uploadAction,
    });

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, BsDynamicFormFileComponent],
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
        {
          provide: DynamicFormComponentFactory,
          useValue: {
            createComponent: ref => ref.createComponent(TestDynamicFormActionComponent).instance,
          },
        },
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormFileComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormFileDefinition;
    formControl = new DynamicFormControl<DynamicFormFileValue, DynamicFormFile>(
      builder,
      form,
      form,
      definition,
      {} as DynamicFormFieldType,
    );

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
