import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormLogLevel } from '@dynamic-forms/core';

@Pipe({ name: 'appEditorLogLevel' })
export class FormEditorLogLevelPipe implements PipeTransform {
  private readonly values = {
    [DynamicFormLogLevel.Error]: 'Error',
    [DynamicFormLogLevel.Warning]: 'Warning',
    [DynamicFormLogLevel.Information]: 'Information',
    [DynamicFormLogLevel.Debug]: 'Debug',
  };

  transform(level: DynamicFormLogLevel): string {
    return this.values[level];
  }
}
