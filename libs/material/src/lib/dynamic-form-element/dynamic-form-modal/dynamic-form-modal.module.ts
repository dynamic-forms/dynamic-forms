import { NgModule } from '@angular/core';
import { dynamicFormModalFactory, DynamicFormConfigModule, DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormModalComponent } from './dynamic-form-modal.component';

export const matDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: MatDynamicFormModalComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(matDynamicFormModalType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class MatDynamicFormModalModule {}
