import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormsModule } from '../../dynamic-forms.module';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormsModule.forChild({
      elementConfig: {
        types: [
          { type: 'content', component: DynamicFormContentComponent }
        ]
      }
    })
  ],
  declarations: [
    DynamicFormContentComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormContentComponent
  ],
  entryComponents: [
    DynamicFormContentComponent
  ]
})
export class DynamicFormContentModule {}
