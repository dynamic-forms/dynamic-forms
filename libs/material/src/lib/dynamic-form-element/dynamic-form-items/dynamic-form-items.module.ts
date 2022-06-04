import { NgModule } from '@angular/core';
import { MatDynamicFormAccordionModule } from './dynamic-form-accordion/dynamic-form-accordion.module';
import { MatDynamicFormTabsModule } from './dynamic-form-tabs/dynamic-form-tabs.module';

@NgModule({
  imports: [
    MatDynamicFormAccordionModule,
    MatDynamicFormTabsModule,
  ],
})
export class MatDynamicFormItemsModule {}
