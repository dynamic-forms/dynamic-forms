import { MockService } from 'ng-mocks';
import { DynamicFormColorPipe } from './dynamic-form-color.pipe';
import { DynamicFormColorService } from './dynamic-form-color.service';

describe('DynamicFormColorService', () => {
  let service: DynamicFormColorService;
  let pipe: DynamicFormColorPipe;

  beforeEach(() => {
    service = MockService(DynamicFormColorService);
    pipe = new DynamicFormColorPipe(service);
  });

  it('calls getColor of color service and returns', () => {
    const getColorSpy = spyOn(service, 'getColor').and.returnValue('color');

    const color = pipe.transform('color');

    expect(color).toBe('color');
    expect(getColorSpy).toHaveBeenCalledWith('color', undefined);
  });

  it('calls getColor with default color of color service and returns', () => {
    const getColorSpy = spyOn(service, 'getColor').and.returnValue('defaultColor');

    const color = pipe.transform(undefined, 'defaultColor');

    expect(color).toBe('defaultColor');
    expect(getColorSpy).toHaveBeenCalledWith(undefined, 'defaultColor');
  });
});
