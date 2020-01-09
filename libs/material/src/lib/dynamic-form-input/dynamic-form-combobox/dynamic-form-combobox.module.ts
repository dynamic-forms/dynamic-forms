import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
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
    DynamicFormConfigModule.forChild(matDynamicFormComboboxConfig)
  ],
  declarations: [
    MatDynamicFormComboboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormComboboxComponent
  ],
  entryComponents: [
    MatDynamicFormComboboxComponent
  ]
})
export class MatDynamicFormComboboxModule {}
