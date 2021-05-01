import { NgModule } from '@angular/core';
import { BsDynamicFormsModule } from '@dynamic-forms/bootstrap';
import { DynamicFormIconModule } from '@dynamic-forms/core';
import { v4 } from 'uuid';
import { MarkdownModule } from '../../markdown/markdown.module';
import { DynamicFormExampleModule } from '../dynamic-form-example.module';
import { BootstrapExamplesRoutingModule } from './bootstrap-examples-routing.module';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

export function dynamicFormIdBuilder(): string {
  return v4();
}

@NgModule({
  imports: [
    MarkdownModule,
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
