import { NgModule } from '@angular/core';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { BsDynamicFormInputMaskModule } from '@dynamic-forms/bootstrap/input-mask';
import { DynamicFormIconModule, DynamicFormThemeModule } from '@dynamic-forms/core';
import { DynamicFormMarkdownModule } from '@dynamic-forms/markdown';
import { v4 } from 'uuid';
import { DynamicFormExtensionsModule } from '../dynamic-form-extensions.module';
import { FormSubmitDialogComponent } from '../form-submit-dialog.component';

@NgModule({
  imports: [
    BsDynamicFormInputMaskModule,
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
    DynamicFormThemeModule.withColors({
      colors: {
        inputAction: 'secondary',
      },
      libraryName: 'bootstrap',
    }),
    DynamicFormExtensionsModule,
    DynamicFormMarkdownModule,
    BsDynamicFormsModule.forRoot({
      theme: 'bootstrap',
      idBuilder: { createId: () => v4() },
    }),
    FormSubmitDialogComponent,
  ],
})
export class BootstrapFormModule {}
