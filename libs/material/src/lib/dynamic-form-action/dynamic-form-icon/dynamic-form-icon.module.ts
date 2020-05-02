import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DynamicFormActionType, DynamicFormConfigModule, DynamicFormIconModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormIconComponent } from './dynamic-form-icon.component';

export const matDynamicFormIconType: DynamicFormActionType = {
  type: 'icon',
  component: MatDynamicFormIconComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DynamicFormIconModule,
    DynamicFormConfigModule.withAction(matDynamicFormIconType)
  ],
  declarations: [
    MatDynamicFormIconComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormIconComponent
  ]
})
export class MatDynamicFormIconModule {}
