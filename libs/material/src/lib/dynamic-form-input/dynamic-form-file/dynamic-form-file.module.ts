import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormElementModule, DynamicFormFileModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormFileComponent } from './dynamic-form-file.component';

export const matDynamicFormFileType: DynamicFormInputType = {
  type: 'file',
  component: MatDynamicFormFileComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    DynamicFormFileModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withInput(matDynamicFormFileType),
  ],
  declarations: [
    MatDynamicFormFileComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormFileComponent,
  ],
})
export class MatDynamicFormFileModule {}
