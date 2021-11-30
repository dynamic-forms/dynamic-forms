import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { v4 } from 'uuid';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { DynamicFormExtensionsModule } from '../dynamic-form-extensions.module';
import { MaterialExamplesRoutingModule } from './material-examples-routing.module';
import { MaterialExamplesComponent } from './material-examples.component';

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
      libraryName: 'material'
    }),
    DynamicFormExtensionsModule,
    MatDynamicFormsModule.forRoot({
      theme: 'material',
      idBuilder: dynamicFormIdBuilder
    }),
    MaterialExamplesRoutingModule
  ],
  declarations: [
    MaterialExamplesComponent
  ]
})
export class MaterialExamplesModule {}
