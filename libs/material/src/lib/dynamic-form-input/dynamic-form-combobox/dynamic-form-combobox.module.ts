import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { MatDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const matDynamicFormComboboxConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'combobox', component: MatDynamicFormComboboxComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormsModule.forChild(matDynamicFormComboboxConfig)
  ],
  declarations: [
    MatDynamicFormComboboxComponent
  ],
  entryComponents: [
    MatDynamicFormComboboxComponent
  ]
})
export class MatDynamicFormComboboxModule {}
