import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { MatDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const matDynamicFormComboboxType: DynamicFormInputType = {
  type: 'combobox',
  component: MatDynamicFormComboboxComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormConfigModule.withInput(matDynamicFormComboboxType)
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
