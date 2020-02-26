import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayFactory } from './dynamic-form-array-factory';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

export const dynamicFormArrayType: DynamicFormFieldType = {
  type: 'array',
  factory: dynamicFormArrayFactory,
  component: DynamicFormArrayComponent,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayPopElementHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'popElement',
  func: field => field.popElement(),
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayClearElementsHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'clearElements',
  func: field => field.clearElements(),
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayPushElementHandlerFactory(formBuilder: DynamicFormBuilder): DynamicFormActionHandler<DynamicFormArray> {
  return {
    type: 'pushElement',
    func: field => {
      const element = formBuilder.createFormArrayElement(field, field.length);
      field.pushElement(element);
    },
    libraryName: dynamicFormLibrary.name
  };
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormArrayType),
    DynamicFormConfigModule.withActionHandler(dynamicFormArrayPopElementHandler),
    DynamicFormConfigModule.withActionHandler(dynamicFormArrayClearElementsHandler),
    DynamicFormConfigModule.withActionHandlerFactory(dynamicFormArrayPushElementHandlerFactory, [ DynamicFormBuilder ])
  ],
  declarations: [
    DynamicFormArrayComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormArrayComponent
  ],
  entryComponents: [
    DynamicFormArrayComponent
  ]
})
export class DynamicFormArrayModule {}
