import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from './radio.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    RadioComponent
  ],
  entryComponents: [
    RadioComponent
  ]
})
export class RadioModule {}
