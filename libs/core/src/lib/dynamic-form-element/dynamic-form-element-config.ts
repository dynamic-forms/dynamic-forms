import { Type } from '@angular/core';
import { DynamicFormContainerComponent } from './dynamic-form-container/dynamic-form-container.component';
import { DynamicFormContentComponent } from './dynamic-form-content/dynamic-form-content.component';
import { DynamicFormElementWrapper } from './dynamic-form-element-wrapper';

export interface DynamicFormElementTypeConfig {
  type: string;
  component: Type<DynamicFormElementWrapper>;
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
