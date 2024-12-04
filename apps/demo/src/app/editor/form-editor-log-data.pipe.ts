import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormLog } from '@dynamic-forms/core';

@Pipe({ name: 'appEditorLogData' })
export class FormEditorLogDataPipe implements PipeTransform {
  transform(log: DynamicFormLog): string {
    return log.data.map(item => (item instanceof Error && item.stack ? item.stack : item)).join('\n');
  }
}
