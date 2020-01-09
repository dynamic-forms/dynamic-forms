import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { MatDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const matDynamicFormTextboxConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'textbox', component: MatDynamicFormTextboxComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormConfigModule.forChild(matDynamicFormTextboxConfig)
  ],
  declarations: [
    MatDynamicFormTextboxComponent
  ],
  entryComponents: [
    MatDynamicFormTextboxComponent
  ]
})
export class MatDynamicFormTextboxModule {}
