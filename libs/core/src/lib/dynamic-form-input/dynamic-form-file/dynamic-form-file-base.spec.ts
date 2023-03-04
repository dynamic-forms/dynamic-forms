import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormControl } from '../../dynamic-form-control/dynamic-form-control';
import { DynamicFormFieldType } from '../../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormValidationService } from '../../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormFile, DynamicFormFileDefinition, DynamicFormFileValue } from './dynamic-form-file';
import { DynamicFormFileBase } from './dynamic-form-file-base';
import { DynamicFormFileDirective } from './dynamic-form-file.directive';

@Component({
  template: `<input dynamicFormFile [acceptFiles]="input.accept" [multipleFiles]="input.multiple" [formControl]="control" />`,
})
class DynamicFormFileTestComponent extends DynamicFormFileBase {
  constructor(protected override builder: DynamicFormBuilder, protected override validationService: DynamicFormValidationService) {
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
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    uploadAction = {} as DynamicFormAction;

    builder = createDynamicFormBuilderSpy();
    builder.createFormAction.and.returnValue(uploadAction);

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        DynamicFormFileDirective,
        DynamicFormFileTestComponent,
      ],
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
    const field = new DynamicFormControl<DynamicFormFileValue, DynamicFormFile>(builder, form, form, {
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
    } as DynamicFormFileDefinition, {} as DynamicFormFieldType);

    fixture = TestBed.createComponent(DynamicFormFileTestComponent);
    component = fixture.componentInstance;
    component.field = field;
  });

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.fileInput).toBeDefined();
    expect(component.uploadAction).toBeUndefined();

    fixture.detectChanges();

    expect(component).toBeDefined();
    expect(component.fileInput).toBeDefined();
    expect(component.uploadAction).toBe(uploadAction);
  });

  it('action calls openFileExplorer', () => {
    spyOn(component.fileInput, 'openFileExplorer');

    const action = component.uploadActionDefinition.template.action as () => void;
    action();

    expect(component.fileInput.openFileExplorer).toHaveBeenCalledTimes(1);
  });

  it('disabled expression return false', () => {
    const expression = component.uploadActionDefinition.expressions.disabled as () => boolean;

    expect(expression()).toBeFalse();
  });
});
