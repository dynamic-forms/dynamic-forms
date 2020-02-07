import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

export const dynamicFormGroupFactory: DynamicFormClassFactory<DynamicFormGroupDefinition, DynamicFormGroup> =
  (builder, root, parent, definition) => builder.createFormGroup(root, parent, definition);

export const dynamicFormGroupType: DynamicFormFieldType<DynamicFormGroupDefinition, DynamicFormGroup> = {
  type: 'group',
  factory: dynamicFormGroupFactory,
  component: DynamicFormGroupComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withField(dynamicFormGroupType)
  ],
  declarations: [
    DynamicFormGroupComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormGroupComponent
  ],
  entryComponents: [
    DynamicFormGroupComponent
  ]
})
export class DynamicFormGroupModule {}
