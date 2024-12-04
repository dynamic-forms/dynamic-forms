import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormDefinition,
  DynamicFormFieldType,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { DynamicFormInputMaskDefinition } from './dynamic-form-input-mask';
import { DynamicFormInputMaskBase } from './dynamic-form-input-mask-base';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';
import { DynamicFormInputMaskConverterService } from './dynamic-form-input-mask-converter.service';
import { DynamicFormInputMaskDirective } from './dynamic-form-input-mask.directive';

@Component({
  selector: 'dynamic-form-input-mask-test',
  template: `<input [dynamicFormInputMask]="inputMask" [formControl]="control" />`,
  imports: [ReactiveFormsModule, DynamicFormInputMaskDirective],
})
class DynamicFormInputMaskTestComponent extends DynamicFormInputMaskBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get maskInput(): DynamicFormInputMaskDirective {
    return this._maskInput;
  }
}

describe('DynamicFormInputMaskBase', () => {
  let fixture: ComponentFixture<DynamicFormInputMaskTestComponent>;
  let component: DynamicFormInputMaskTestComponent;
  let builder: DynamicFormBuilder;
  let converterService: DynamicFormInputMaskConverterService;

  beforeEach(() => {
    const defaultConverter = { parse: value => value, format: value => value };
    builder = MockService(DynamicFormBuilder, { getDefinition: definition => definition });
    converterService = MockService(DynamicFormInputMaskConverterService, { getConverter: _ => defaultConverter });

    TestBed.configureTestingModule({
      imports: [DynamicFormInputMaskTestComponent],
      providers: [
        {
          provide: DynamicFormBuilder,
          useValue: builder,
        },
        {
          provide: DynamicFormValidationService,
          useValue: {},
        },
        {
          provide: DynamicFormInputMaskConverterService,
          useValue: converterService,
        },
      ],
    });

    const form = new DynamicForm(builder, { key: 'root', children: [] } as DynamicFormDefinition, {});
    const field = new DynamicFormInputMaskControl(
      builder,
      form,
      form,
      {
        id: 'id',
        key: 'key',
        index: 1,
        template: {
          input: {
            type: 'input-mask',
          },
          hints: {},
          validation: {},
        },
      } as DynamicFormInputMaskDefinition,
      {} as DynamicFormFieldType,
    );

    fixture = TestBed.createComponent(DynamicFormInputMaskTestComponent);
    component = fixture.componentInstance;
    component.field = field;
  });

  it('creates component', () => {
    expect(component).toBeDefined();

    fixture.detectChanges();

    expect(component).toBeDefined();
  });
});
