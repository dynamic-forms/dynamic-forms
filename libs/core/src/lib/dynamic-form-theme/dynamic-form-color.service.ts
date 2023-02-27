import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormColorConfig, DynamicFormColorConfigs, DYNAMIC_FORM_COLOR_CONFIGS } from './dynamic-form-color-config';

@Injectable()
export class DynamicFormColorService {
  readonly colorConfig: DynamicFormColorConfig;

  constructor(
    private libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_COLOR_CONFIGS)
    private colorConfigs: DynamicFormColorConfigs,
  ) {
    this.colorConfig = this.mergeColorConfigs(this.colorConfigs);
  }

  getColor(color?: string, defaultColor?: string): string | undefined {
    if (color) {
      return this.colorConfig.colors[color] || color;
    }
    return defaultColor;
  }

  private mergeColorConfigs(configs: DynamicFormColorConfigs): DynamicFormColorConfig {
    const library = this.libraryService.library;
    const libraryName = library.name;
    const defaultConfig = { colors: {}, libraryName };
    if (!configs || !configs.length) {
      return defaultConfig;
    }

    const libraryConfigs = this.getLibraryConfigs(configs);
    return libraryConfigs.reduce((result, config) => {
      return {
        ...result, ...config,
        colors: { ...result.colors, ...config.colors },
        libraryName,
      };
    }, defaultConfig);
  }

  private getLibraryConfigs(configs: DynamicFormColorConfigs): DynamicFormColorConfigs {
    return this.libraryService.libraryNamesReverse
      .map(name => configs.find(config => config.libraryName === name))
      .filter(config => !!config);
  }
}
