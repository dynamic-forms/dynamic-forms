import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormValidationMaterialModule } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormComboboxComponent } from './dynamic-form-combobox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormValidationMaterialModule
  ],
  declarations: [
    DynamicFormComboboxComponent
  ],
  entryComponents: [
    DynamicFormComboboxComponent
  ]
})
export class DynamicFormComboboxModule {}
