import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormControl } from '../../dynamic-form-control/dynamic-form-control';
import { DynamicFormFieldType } from '../../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormValidationService } from '../../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormFile, DynamicFormFileDefinition, DynamicFormFileValue } from './dynamic-form-file';
import { DynamicFormFileBase } from './dynamic-form-file-base';
import { DynamicFormFileDirective } from './dynamic-form-file.directive';

@Component({
  selector: 'dynamic-form-file-test',
  imports: [ReactiveFormsModule, DynamicFormFileDirective],
  template: `<input dynamicFormFile [acceptFiles]="input.accept" [multipleFiles]="input.multiple" [formControl]="control" />`,
})
class DynamicFormFileTestComponent extends DynamicFormFileBase {
  constructor(
    protected override builder: DynamicFormBuilder,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(builder, validationService);
  }

  get fileInput(): DynamicFormFileDirective {
    return this._fileInput;
  }
}

describe('DynamicFormFileBase', () => {
  let fixture: ComponentFixture<DynamicFormFileTestComponent>;
  let component: DynamicFormFileTestComponent;
  let uploadAction: DynamicFormAction;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    uploadAction = {} as DynamicFormAction;

    builder = MockService(DynamicFormBuilder, {
      getDefinition: definition => definition,
      createFormAction: (_, __, definition) => {
        (uploadAction as any).definition = definition;
        return uploadAction;
      },
    });

    TestBed.configureTestingModule({
      imports: [DynamicFormFileTestComponent],
      providers: [
        {
          provide: DynamicFormBuilder,
          useValue: builder,
        },
        {
          provide: DynamicFormValidationService,
          useValue: {},
        },
      ],
    });

    const form = new DynamicForm(builder, { key: 'root', children: [] } as DynamicFormDefinition, {});
    const field = new DynamicFormControl<DynamicFormFileValue, DynamicFormFile>(
      builder,
      form,
      form,
      {
        id: 'id',
        key: 'key',
        index: 1,
        template: {
          input: {
            type: 'file',
          },
          hints: {},
          validation: {},
        },
      } as DynamicFormFileDefinition,
      {} as DynamicFormFieldType,
    );

    fixture = TestBed.createComponent(DynamicFormFileTestComponent);
    component = fixture.componentInstance;
    component.field = field;
  });

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.fileInput).toBeUndefined();
    expect(component.uploadAction).toBeUndefined();

    fixture.detectChanges();

    expect(component).toBeDefined();
    expect(component.fileInput).toBeDefined();
    expect(component.uploadAction).toBe(uploadAction);
  });

  it('creates upload action with default definition', () => {
    fixture.detectChanges();

    expect(component.uploadAction.definition.type).toBe('icon');
    expect(component.uploadAction.definition.template).toEqual({
      ...component.defaultUploadActionDefinition.template,
      ...component.requiredUploadActionDefinition.template,
    });
    expect(component.uploadAction.definition.expressions).toEqual(component.requiredUploadActionDefinition.expressions);
  });

  it('creates upload action with merged definition', () => {
    component.field.definition.uploadActionDefinition = {
      type: 'button',
      template: {
        label: 'Upload',
        color: 'primary',
      },
    } as any;
    fixture.detectChanges();

    expect(component.uploadAction.definition.type).toBe('button');
    expect(component.uploadAction.definition.template).toEqual({
      ...component.defaultUploadActionDefinition.template,
      ...component.field.definition.uploadActionDefinition.template,
      ...component.requiredUploadActionDefinition.template,
    });
    expect(component.uploadAction.definition.expressions).toEqual(component.requiredUploadActionDefinition.expressions);
  });

  it('action calls openFileExplorer', () => {
    fixture.detectChanges();

    const fileExplorerSpy = spyOn(component.fileInput, 'openFileExplorer');

    const action = uploadAction.definition.template.action as () => void;
    action();

    expect(fileExplorerSpy).toHaveBeenCalledTimes(1);
  });

  it('disabled expression for upload action returns false', () => {
    fixture.detectChanges();

    const expression = uploadAction.definition.expressions.disabled as () => boolean;

    expect(expression()).toBeFalse();
  });

  it('disabled expression for upload action returns true if field control is disabled', () => {
    fixture.detectChanges();

    const expression = uploadAction.definition.expressions.disabled as () => boolean;

    component.field.control.disable();

    expect(expression()).toBeTrue();
  });

  it('disabled expression for upload action returns true if field control is disabled', () => {
    fixture.detectChanges();

    const expression = uploadAction.definition.expressions.disabled as () => boolean;

    component.field.control.disable();

    expect(expression()).toBeTrue();
  });

  it('disabled expression for upload action returns true if field is readonly', () => {
    fixture.detectChanges();

    const expression = uploadAction.definition.expressions.disabled as () => boolean;

    component.field.template.readonly = true;

    expect(expression()).toBeTrue();
  });
});
