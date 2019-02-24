import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DropdownComponent
  ],
  entryComponents: [
    DropdownComponent
  ]
})
export class DropdownModule {}
