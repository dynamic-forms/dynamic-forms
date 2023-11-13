import { DynamicFormColorPipe } from './dynamic-form-color.pipe';
import { DynamicFormColorService } from './dynamic-form-color.service';

describe('DynamicFormColorService', () => {
  let service: jasmine.SpyObj<DynamicFormColorService>;
  let pipe: DynamicFormColorPipe;

  beforeEach(() => {
    service = jasmine.createSpyObj<DynamicFormColorService>('service', ['getColor']);
    pipe = new DynamicFormColorPipe(service);
  });

  it('calls getColor of color service and returns', () => {
    service.getColor.and.returnValue('color');

    const color = pipe.transform('color');

    expect(color).toBe('color');
    expect(service.getColor).toHaveBeenCalledWith('color', undefined);
  });

  it('calls getColor with default color of color service and returns', () => {
    service.getColor.and.returnValue('defaultColor');

    const color = pipe.transform(undefined, 'defaultColor');

    expect(color).toBe('defaultColor');
    expect(service.getColor).toHaveBeenCalledWith(undefined, 'defaultColor');
  });
});
