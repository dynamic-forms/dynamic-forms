import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormIconService } from './dynamic-form-icon.service';

@Pipe({
  standalone: true,
  name: 'dynamicFormIcon',
})
export class DynamicFormIconPipe implements PipeTransform {
  constructor(private iconService: DynamicFormIconService) {}

  transform(icon: string): string {
    return this.iconService.getIcon(icon);
  }
}
