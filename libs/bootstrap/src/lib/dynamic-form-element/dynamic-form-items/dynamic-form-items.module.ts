import { NgModule } from '@angular/core';
import { BsDynamicFormAccordionModule } from './dynamic-form-accordion/dynamic-form-accordion.module';
import { BsDynamicFormTabsModule } from './dynamic-form-tabs/dynamic-form-tabs.module';

@NgModule({
  imports: [
    BsDynamicFormAccordionModule,
    BsDynamicFormTabsModule
  ]
})
export class BsDynamicFormItemsModule {}
