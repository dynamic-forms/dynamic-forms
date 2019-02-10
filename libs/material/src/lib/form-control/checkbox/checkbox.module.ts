import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  declarations: [
    CheckboxComponent
  ]
})
export class CheckboxModule {}
