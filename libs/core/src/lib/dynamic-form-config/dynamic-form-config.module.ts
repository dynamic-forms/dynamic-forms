import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormElementType, DYNAMIC_FORM_ELEMENT_CONFIG } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormFieldWrapperType, DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputType, DYNAMIC_FORM_INPUT_CONFIG } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormConfigService } from './dynamic-form-config.service';

@NgModule({
  providers: [
    DynamicFormConfigService
  ]
})
export class DynamicFormConfigModule {
  static withElement(elementType: DynamicFormElementType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ELEMENT_CONFIG,
          useValue: elementType,
          multi: true
        }
      ]
    };
  }

  static withElements(elementTypes: DynamicFormElementType[]): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ELEMENT_CONFIG,
          useValue: elementTypes,
          multi: true
        }
      ]
    };
  }

  static withField(fieldType: DynamicFormFieldType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_TYPE_CONFIG,
          useValue: fieldType,
          multi: true
        }
      ]
    };
  }

  static withFields(fieldTypes: DynamicFormFieldType[]): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_TYPE_CONFIG,
          useValue: fieldTypes,
          multi: true
        }
      ]
    };
  }

  static withAction(actionType: DynamicFormActionType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_TYPE_CONFIG,
          useValue: actionType,
          multi: true
        }
      ]
    };
  }

  static withActions(actionTypes: DynamicFormActionType[]): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_TYPE_CONFIG,
          useValue: actionTypes,
          multi: true
        }
      ]
    };
  }

  static withInput(inputType: DynamicFormInputType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_INPUT_CONFIG,
          useValue: inputType,
          multi: true
        }
      ]
    };
  }

  static withInputs(inputTypes: DynamicFormInputType[]): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_INPUT_CONFIG,
          useValue: inputTypes,
          multi: true
        }
      ]
    };
  }

  static withFieldWrapper(fieldWrapperType: DynamicFormFieldWrapperType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_WRAPPER_CONFIG,
          useValue: fieldWrapperType,
          multi: true
        }
      ]
    };
  }

  static withFieldWrappers(fieldWrapperTypes: DynamicFormFieldWrapperType[]): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_WRAPPER_CONFIG,
          useValue: fieldWrapperTypes,
          multi: true
        }
      ]
    };
  }
}
