import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
  DynamicFormModalModule,
  dynamicFormModalFactory,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormModalComponent } from './dynamic-form-modal.component';

export const bsDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: BsDynamicFormModalComponent,
  libraryName: bsDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule, DynamicFormModalModule];

/**
 * @deprecated Use {@link withBsDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormElements(bsDynamicFormModalType)),
})
export class BsDynamicFormModalModule {}
