import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';
import { DynamicFormIconService } from './dynamic-form-icon.service';

@Pipe({ name: 'dynamicFormIcon' })
export class DynamicFormIconPipe implements PipeTransform {
  constructor(private iconService: DynamicFormIconService) {}

  transform(template: DynamicFormIconTemplate): string {
    return this.iconService.getIcon(template);
  }
}
