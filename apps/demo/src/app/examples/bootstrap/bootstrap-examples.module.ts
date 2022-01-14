import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { v4 } from 'uuid';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormExtensionsModule } from '../dynamic-form-extensions.module';
import { BootstrapExamplesRoutingModule } from './bootstrap-examples-routing.module';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

export const dynamicFormIdBuilder = (): string => v4();

@NgModule({
  imports: [
    CommonModule,
    DynamicFormExampleModule,
    DynamicFormIconModule.withIcons({
      icons: {
        submit: 'send',
        validate: 'error',
        reset: 'delete',
        resetDefault: 'restore_page',
        push: 'add',
        pop: 'remove',
        remove: 'clear',
        clear: 'clear',
        moveDown: 'arrow_downward',
        moveUp: 'arrow_upward',
        register: 'add',
        maximizeModal: 'fullscreen',
        minimizeModal: 'fullscreen_exit'
      },
      libraryName: 'bootstrap'
    }),
    DynamicFormExtensionsModule,
    BsDynamicFormsModule.forRoot({
      theme: 'bootstrap',
      idBuilder: dynamicFormIdBuilder
    }),
    BootstrapExamplesRoutingModule
  ],
  declarations: [
    BootstrapExamplesComponent
  ]
})
export class BootstrapExamplesModule {}
