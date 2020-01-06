import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormsModule } from '../../dynamic-forms.module';
import { DynamicFormElementModule } from '../dynamic-form-element.module';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormsModule.forChild({
      library: 'core',
      elementConfig: {
        types: [
          { type: 'container', component: DynamicFormContainerComponent  }
        ]
      }
    })
  ],
  declarations: [
    DynamicFormContainerComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormContainerComponent
  ],
  entryComponents: [
    DynamicFormContainerComponent
  ]
})
export class DynamicFormContainerModule {}
