import { Type } from '@angular/core';
import { DynamicFormContainerComponent } from './dynamic-form-container/dynamic-form-container.component';
import { DynamicFormContentComponent } from './dynamic-form-content/dynamic-form-content.component';
import { DynamicFormElementBase } from './dynamic-form-element-base';

export interface DynamicFormElementTypeConfig {
  type: string;
  component: Type<DynamicFormElementBase>;
}

export interface DynamicFormElementConfig {
  types: DynamicFormElementTypeConfig[];
}

export const dynamicFormElementConfig: DynamicFormElementConfig = {
  types: [
    { type: 'content', component: DynamicFormContentComponent },
    { type: 'container', component: DynamicFormContainerComponent }
  ]
};
