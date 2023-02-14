import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormMarkdownModule } from '@dynamic-forms/markdown';
import { v4 } from 'uuid';
import { FormSubmitDialogModule } from '../form-submit-dialog.module';
import { DynamicFormExtensionsModule } from '../dynamic-form-extensions.module';
import { BootstrapFormComponent } from './bootstrap-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormSubmitDialogModule,
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
        minimizeModal: 'fullscreen_exit',
      },
      libraryName: 'bootstrap',
    }),
    DynamicFormExtensionsModule,
    DynamicFormMarkdownModule,
    BsDynamicFormsModule.forRoot({
      theme: 'bootstrap',
      idBuilder: { createId: () => v4() },
    }),
  ],
  declarations: [
    BootstrapFormComponent,
  ],
  exports: [
    BootstrapFormComponent,
  ],
})
export class BootstrapFormModule {}
