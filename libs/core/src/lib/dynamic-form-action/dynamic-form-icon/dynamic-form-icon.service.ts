import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DYNAMIC_FORM_ICON_CONFIGS, DynamicFormIconConfig, DynamicFormIconConfigs } from './dynamic-form-icon-config';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';

@Injectable()
export class DynamicFormIconService {
  readonly iconConfig: DynamicFormIconConfig;

  constructor(
    private libraryService: DynamicFormLibraryService,
    @Optional()
    @Inject(DYNAMIC_FORM_ICON_CONFIGS)
    private iconConfigs: DynamicFormIconConfigs,
  ) {
    this.iconConfig = this.mergeIconConfigs(this.iconConfigs);
  }

  getIcon(icon: string): string;
  /**
   * @deprecated The method should not be used
   */
  getIcon(template: DynamicFormIconTemplate): string;
  getIcon(iconOrTemplate: string | DynamicFormIconTemplate): string {
    const icon = typeof iconOrTemplate === 'string' ? iconOrTemplate : iconOrTemplate?.icon;
    if (icon) {
      return this.iconConfig.icons[icon] || icon;
    }
    return undefined;
  }

  private mergeIconConfigs(configs: DynamicFormIconConfigs): DynamicFormIconConfig {
    const library = this.libraryService.library;
    const libraryName = library.name;
    const defaultConfig = { icons: {}, libraryName };
    if (!configs || !configs.length) {
      return defaultConfig;
    }

    const libraryConfigs = this.getLibraryConfigs(configs);
    return libraryConfigs.reduce((result, config) => {
      return {
        ...result,
        ...config,
        icons: { ...result.icons, ...config.icons },
        libraryName,
      };
    }, defaultConfig);
  }

  private getLibraryConfigs(configs: DynamicFormIconConfigs): DynamicFormIconConfigs {
    return this.libraryService.libraryNamesReverse
      .map(name => configs.find(config => config.libraryName === name))
      .filter(config => !!config);
  }
}
