import { MockService } from 'ng-mocks';
import { DynamicFormIconPipe } from './dynamic-form-icon.pipe';
import { DynamicFormIconService } from './dynamic-form-icon.service';

describe('DynamicFormIconPipe', () => {
  let service: DynamicFormIconService;
  let pipe: DynamicFormIconPipe;

  beforeEach(() => {
    service = MockService(DynamicFormIconService);
    pipe = new DynamicFormIconPipe(service);
  });

  it('calls getIcon of icon service and returns', () => {
    spyOn(service, 'getIcon').and.returnValue('icon');

    const icon = pipe.transform('icon');

    expect(icon).toBe('icon');
    expect(service.getIcon).toHaveBeenCalledWith('icon' as any);
  });
});
