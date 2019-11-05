import { Type } from '@angular/core';

export interface DynamicFormElementTypeConfig {
  type: string;
  component: Type<any>;
}

export interface DynamicFormElementConfig {
  types: DynamicFormElementTypeConfig[];
}
