import { NgModule } from '@angular/core';
import { MatDynamicFormAccordionModule } from './dynamic-form-accordion/dynamic-form-accordion.module';
import { MatDynamicFormTabsModule } from './dynamic-form-tabs/dynamic-form-tabs.module';

const modules = [MatDynamicFormAccordionModule, MatDynamicFormTabsModule];

/**
 * @deprecated Use {@link withMatDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
})
export class MatDynamicFormItemsModule {}
