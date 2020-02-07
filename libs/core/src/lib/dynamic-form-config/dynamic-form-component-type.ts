import { Type } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormClassFactory } from './dynamic-form-class-factory';
import { DynamicFormLibraryName } from './dynamic-form-library';

export interface DynamicFormComponentType<Component extends DynamicFormElementBase = DynamicFormElementBase> {
  type: string;
  component: Type<Component>;
  libraryName: DynamicFormLibraryName;
}
