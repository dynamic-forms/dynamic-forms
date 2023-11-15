import { NgModule } from '@angular/core';
import { MatDynamicFormItemsModule } from './dynamic-form-items/dynamic-form-items.module';
import { MatDynamicFormModalModule } from './dynamic-form-modal/dynamic-form-modal.module';

@NgModule({
  imports: [MatDynamicFormItemsModule, MatDynamicFormModalModule],
})
export class MatDynamicFormElementModule {}
