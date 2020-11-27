import { NgModule } from '@angular/core';
import { MatDynamicFormButtonModule } from './dynamic-form-button/dynamic-form-button.module';
import { MatDynamicFormIconModule } from './dynamic-form-icon/dynamic-form-icon.module';

@NgModule({
  imports: [
    MatDynamicFormButtonModule,
    MatDynamicFormIconModule
  ]
})
export class MatDynamicFormActionModule {}
