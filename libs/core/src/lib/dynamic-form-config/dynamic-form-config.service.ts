import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormElementTypeConfig, DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from '../dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldTypeConfig, DYNAMIC_FORM_FIELD_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormFieldWrapperConfig, DynamicFormFieldWrapperType,
  DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormInputTypeConfig, DYNAMIC_FORM_INPUT_TYPE_CONFIG } from '../dynamic-form-input/dynamic-form-input-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormClassType } from './dynamic-form-class-type';

@Injectable()
export class DynamicFormConfigService {
  readonly elementTypes: DynamicFormElementType[];
  readonly fieldTypes: DynamicFormFieldType[];
  readonly actionTypes: DynamicFormActionType[];
  readonly inputTypes: DynamicFormInputType[];
  readonly fieldWrapperTypes: DynamicFormFieldWrapperType[];

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_TYPE_CONFIG)
    private elementTypeConfig: DynamicFormElementTypeConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPE_CONFIG)
    private fieldTypeConfig: DynamicFormFieldTypeConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_TYPE_CONFIG)
    private actionTypeConfig: DynamicFormActionTypeConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_TYPE_CONFIG)
    private inputTypeConfig: DynamicFormInputTypeConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_CONFIG)
    private fieldWrapperConfig: DynamicFormFieldWrapperConfig = null
  ) {
    this.elementTypes = this.libraryService.filterTypes(this.elementTypeConfig);
    this.fieldTypes = this.libraryService.filterTypes(this.fieldTypeConfig);
    this.actionTypes = this.libraryService.filterTypes(this.actionTypeConfig);
    this.inputTypes = this.libraryService.filterTypes(this.inputTypeConfig);
    this.fieldWrapperTypes = this.libraryService.filterTypes(this.fieldWrapperConfig);
  }

  getClassType(type: string): DynamicFormClassType {
    if (this.elementTypes.some(f => f.type === type)) {
      return 'element';
    } else if (this.fieldTypes.some(f => f.type === type)) {
      return 'field';
    } else if (this.actionTypes.some(f => f.type === type)) {
      return 'action';
    } else {
      return undefined;
    }
  }

  getElementType(type: string): DynamicFormElementType {
    return this.elementTypes.find(f => f.type === type);
  }

  getFieldType(type: string): DynamicFormFieldType {
    return this.fieldTypes.find(f => f.type === type);
  }

  getActionType(type: string): DynamicFormActionType {
    return this.actionTypes.find(f => f.type === type);
  }

  getInputType(type: string): DynamicFormInputType {
    return this.inputTypes.find(f => f.type === type);
  }

  getFieldWrapperType(type: string): DynamicFormFieldWrapperType {
    return this.fieldWrapperTypes.find(f => f.type === type);
  }
}
