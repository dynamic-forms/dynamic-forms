import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormBuilder, DynamicFormComponent } from './dynamic-form';
import { DynamicFormItemFactory, DynamicFormItemComponent } from './dynamic-form-item';
import { DynamicFormGroupComponent } from './dynamic-form-group';
import { DynamicFormArrayComponent } from './dynamic-form-array';
import { DynamicFormControlComponent } from './dynamic-form-control';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormItemComponent,
    DynamicFormGroupComponent,
    DynamicFormArrayComponent,
    DynamicFormControlComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormComponent
  ],
  entryComponents: [
    DynamicFormGroupComponent,
    DynamicFormArrayComponent,
    DynamicFormControlComponent
  ]
})
export class DynamicFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        DynamicFormBuilder,
        DynamicFormItemFactory
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        DynamicFormBuilder
      ]
    };
  }
 }
