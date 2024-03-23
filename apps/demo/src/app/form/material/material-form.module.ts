import { NgModule } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DynamicFormIconModule, DynamicFormThemeModule } from '@dynamic-forms/core';
import { DynamicFormMarkdownModule } from '@dynamic-forms/markdown';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { MatDynamicFormInputMaskModule } from '@dynamic-forms/material/input-mask';
import { v4 } from 'uuid';
import { DynamicFormExtensionsModule } from '../dynamic-form-extensions.module';
import { FormSubmitDialogComponent } from '../form-submit-dialog.component';

@NgModule({
  imports: [
    DynamicFormExtensionsModule,
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
      libraryName: 'material',
    }),
    DynamicFormThemeModule.withColors({
      colors: {
        secondary: 'accent',
        danger: 'warn',
        warning: 'warn',
        inputAction: 'none',
      },
      libraryName: 'material',
    }),
    DynamicFormMarkdownModule,
    FormSubmitDialogComponent,
    MatDynamicFormsModule.forRoot({
      theme: 'material',
      idBuilder: { createId: () => v4() },
    }),
    MatDynamicFormInputMaskModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class MaterialFormModule {}
