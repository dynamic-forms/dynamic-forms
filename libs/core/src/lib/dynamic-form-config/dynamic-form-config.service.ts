import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormActionConfig, DynamicFormActionType,
  DYNAMIC_FORM_ACTION_CONFIG } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementConfig, DynamicFormElementType,
  DYNAMIC_FORM_ELEMENT_CONFIG } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldTypeConfig, DYNAMIC_FORM_FIELD_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormFieldWrapperConfig, DynamicFormFieldWrapperType,
  DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputConfig, DynamicFormInputType,
  DYNAMIC_FORM_INPUT_CONFIG } from '../dynamic-form-input/dynamic-form-input-type';
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
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_CONFIG)
    private elementConfig: DynamicFormElementConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPE_CONFIG)
    private fieldTypeConfig: DynamicFormFieldTypeConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_CONFIG)
    private actionConfig: DynamicFormActionConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_CONFIG)
    private inputConfig: DynamicFormInputConfig = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_CONFIG)
    private fieldWrapperConfig: DynamicFormFieldWrapperConfig = null
  ) {
    this.elementTypes = this.libraryService.filterTypes(this.elementConfig);
    this.fieldTypes = this.libraryService.filterTypes(this.fieldTypeConfig);
    this.actionTypes = this.libraryService.filterTypes(this.actionConfig);
    this.inputTypes = this.libraryService.filterTypes(this.inputConfig);
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
