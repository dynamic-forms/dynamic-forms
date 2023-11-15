import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';
import { DynamicFormIconService } from './dynamic-form-icon.service';

@Pipe({
  standalone: true,
  name: 'dynamicFormIcon',
})
export class DynamicFormIconPipe implements PipeTransform {
  constructor(private iconService: DynamicFormIconService) {}

  transform(icon: string): string;
  /**
   * @deprecated The method should not be used
   */
  transform(template: DynamicFormIconTemplate): string;
  transform(iconOrTemplate: string | DynamicFormIconTemplate): string {
    const icon = typeof iconOrTemplate === 'string' ? iconOrTemplate : iconOrTemplate?.icon;
    return this.iconService.getIcon(icon);
  }
}
