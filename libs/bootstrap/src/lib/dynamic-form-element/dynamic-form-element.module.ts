import { NgModule } from '@angular/core';
import { BsDynamicFormItemsModule } from './dynamic-form-items/dynamic-form-items.module';
import { BsDynamicFormModalModule } from './dynamic-form-modal/dynamic-form-modal.module';

@NgModule({
  imports: [BsDynamicFormItemsModule, BsDynamicFormModalModule],
})
export class BsDynamicFormElementModule {}
