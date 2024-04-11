import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
  DynamicFormModalModule,
  dynamicFormModalFactory,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormModalComponent } from './dynamic-form-modal.component';

export const matDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: MatDynamicFormModalComponent,
  libraryName: matDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule, DynamicFormModalModule];

/**
 * @deprecated Use {@link withMatDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormElements(matDynamicFormModalType)),
})
export class MatDynamicFormModalModule {}
