import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { TextboxComponent } from './textbox.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    DynamicFormsCoreModule.forChild({
      controlConfig: {
        types: [
          { type: 'text', component: TextboxComponent },
          { type: 'email', component: TextboxComponent },
          { type: 'password', component: TextboxComponent }
        ]
      }
    })
  ],
  declarations: [
    TextboxComponent
  ],
  exports: [
    DynamicFormsCoreModule
  ]
})
export class TextboxModule {}
