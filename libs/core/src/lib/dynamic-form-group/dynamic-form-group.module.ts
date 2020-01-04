import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormsModule } from '../dynamic-forms.module';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormsModule.forChild({
      library: 'core',
      fieldConfig: {
        types: [
          { type: 'group', component: DynamicFormGroupComponent }
        ]
      }
    })
  ],
  declarations: [
    DynamicFormGroupComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormGroupComponent
  ],
  entryComponents: [
    DynamicFormGroupComponent
  ]
})
export class DynamicFormGroupModule {}
