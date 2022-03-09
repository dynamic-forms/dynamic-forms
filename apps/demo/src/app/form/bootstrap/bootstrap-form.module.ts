import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { v4 } from 'uuid';
import { DynamicFormExtensionsModule } from '../dynamic-form-extensions.module';
import { BootstrapFormComponent } from './bootstrap-form.component';

export const dynamicFormIdBuilder = (): string => v4();

@NgModule({
  imports: [
    CommonModule,
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
  ],
  declarations: [
    BootstrapFormComponent
  ],
  exports: [
    BootstrapFormComponent
  ]
})
export class BootstrapFormModule {}