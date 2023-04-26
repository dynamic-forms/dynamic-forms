import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormColorService } from './dynamic-form-color.service';

@Pipe({
  standalone: true,
  name: 'dynamicFormColor',
})
export class DynamicFormColorPipe implements PipeTransform {
  constructor(private colorService: DynamicFormColorService) {}

  transform(color?: string, defaultColor?: string): string | undefined {
    return this.colorService.getColor(color, defaultColor);
  }
}
