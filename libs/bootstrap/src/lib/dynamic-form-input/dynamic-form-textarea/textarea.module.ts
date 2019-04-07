import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    TextareaComponent
  ],
  entryComponents: [
    TextareaComponent
  ]
})
export class TextareaModule {}
