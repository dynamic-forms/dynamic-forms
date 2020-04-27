import { DynamicFormIconTemplate } from './dynamic-form-icon-template';
import { DynamicFormIconPipe } from './dynamic-form-icon.pipe';
import { DynamicFormIconService } from './dynamic-form-icon.service';

describe('DynamicFormIconService', () => {
  let service: jasmine.SpyObj<DynamicFormIconService>;
  let pipe: DynamicFormIconPipe;

  beforeEach(() => {
    service = jasmine.createSpyObj<DynamicFormIconService>('service', [ 'getIcon' ]);
    pipe = new DynamicFormIconPipe(service);
  });

  it('', () => {
    service.getIcon.and.returnValue('icon');

    const template = <DynamicFormIconTemplate>{};
    const icon = pipe.transform(template);

    expect(icon).toBe('icon');
    expect(service.getIcon).toHaveBeenCalledWith(template);
  });
});
