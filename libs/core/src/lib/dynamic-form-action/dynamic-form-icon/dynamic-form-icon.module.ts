import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormActionType } from '../dynamic-form-action-type';
import { DynamicFormIconComponent } from './dynamic-form-icon.component';
import { DynamicFormIconPipe } from './dynamic-form-icon.pipe';
import { DynamicFormIconService } from './dynamic-form-icon.service';
import { DynamicFormIconConfig, DYNAMIC_FORM_ICON_CONFIGS } from './dynamic-form-icon-config';

export const dynamicFormIconType: DynamicFormActionType = {
  type: 'icon',
  component: DynamicFormIconComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withAction(dynamicFormIconType)
  ],
  declarations: [
    DynamicFormIconPipe,
    DynamicFormIconComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormIconPipe,
    DynamicFormIconComponent
  ],
  providers: [
    DynamicFormIconService
  ],
  entryComponents: [
    DynamicFormIconComponent
  ]
})
export class DynamicFormIconModule {
  static withIcons(iconConfig: DynamicFormIconConfig): ModuleWithProviders<DynamicFormIconModule> {
    return {
      ngModule: DynamicFormIconModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ICON_CONFIGS,
          useValue: iconConfig,
          multi: true
        }
      ]
    };
  }
}
