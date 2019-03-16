import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    RadioButtonComponent
  ],
  entryComponents: [
    RadioButtonComponent
  ]
})
export class RadioButtonModule {}
