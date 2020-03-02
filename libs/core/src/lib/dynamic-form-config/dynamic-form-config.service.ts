import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormClassType } from './dynamic-form-class-type';

@Injectable()
export class DynamicFormConfigService {
  readonly elementTypes: DynamicFormElementTypes;
  readonly fieldTypes: DynamicFormFieldTypes;
  readonly actionTypes: DynamicFormActionTypes;
  readonly inputTypes: DynamicFormInputTypes;
  readonly fieldWrapperTypes: DynamicFormFieldWrapperTypes;

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_TYPES) private _elementTypes: DynamicFormElementTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPES) private _fieldTypes: DynamicFormFieldTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_TYPES) private _actionTypes: DynamicFormActionTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_TYPES) private _inputTypes: DynamicFormInputTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES) private _fieldWrapperTypes: DynamicFormFieldWrapperTypes = null
  ) {
    this.elementTypes = this.libraryService.filterTypes(this._elementTypes);
    this.fieldTypes = this.libraryService.filterTypes(this._fieldTypes);
    this.actionTypes = this.libraryService.filterTypes(this._actionTypes);
    this.inputTypes = this.libraryService.filterTypes(this._inputTypes);
    this.fieldWrapperTypes = this.libraryService.filterTypes(this._fieldWrapperTypes);
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

  getElementType(type: string) {
    return this.elementTypes.find(f => f.type === type);
  }

  getFieldType(type: string) {
    return this.fieldTypes.find(f => f.type === type);
  }

  getActionType(type: string) {
    return this.actionTypes.find(f => f.type === type);
  }

  getInputType(type: string) {
    return this.inputTypes.find(f => f.type === type);
  }

  getFieldWrapperType(type: string) {
    return this.fieldWrapperTypes.find(f => f.type === type);
  }
}
