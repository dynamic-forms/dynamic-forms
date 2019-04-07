import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RadioComponent } from './radio.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  declarations: [
    RadioComponent
  ],
  entryComponents: [
    RadioComponent
  ]
})
export class RadioModule {}
