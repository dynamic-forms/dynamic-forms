import { DynamicFormIconPipe } from './dynamic-form-icon.pipe';
import { DynamicFormIconService } from './dynamic-form-icon.service';

describe('DynamicFormIconPipe', () => {
  let service: jasmine.SpyObj<DynamicFormIconService>;
  let pipe: DynamicFormIconPipe;

  beforeEach(() => {
    service = jasmine.createSpyObj<DynamicFormIconService>('service', ['getIcon']);
    pipe = new DynamicFormIconPipe(service);
  });

  it('calls getIcon of icon service and returns', () => {
    service.getIcon.and.returnValue('icon');

    const icon = pipe.transform('icon');

    expect(icon).toBe('icon');
    expect(service.getIcon).toHaveBeenCalledWith('icon' as any);
  });
});
