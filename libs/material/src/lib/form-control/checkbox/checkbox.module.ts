import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    DynamicFormsCoreModule.forChild({
      controlConfig: {
        types: [
          { type: 'checkbox', component: CheckboxComponent }
        ]
      }
    })
  ],
  declarations: [
    CheckboxComponent
  ],
  exports: [
    DynamicFormsCoreModule
  ]
})
export class CheckboxModule {}
