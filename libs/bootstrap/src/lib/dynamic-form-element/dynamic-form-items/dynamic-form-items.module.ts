import { NgModule } from '@angular/core';
import { BsDynamicFormAccordionModule } from './dynamic-form-accordion/dynamic-form-accordion.module';
import { BsDynamicFormTabsModule } from './dynamic-form-tabs/dynamic-form-tabs.module';

const modules = [BsDynamicFormAccordionModule, BsDynamicFormTabsModule];

/**
 * @deprecated Use {@link withBsDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
})
export class BsDynamicFormItemsModule {}
