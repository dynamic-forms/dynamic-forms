import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormContentType, DynamicFormContentModule } from './dynamic-form-content.module';

describe('DynamicFormContentModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormContentModule,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
      ],
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPES',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const types = service.elementTypes;

      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormContentType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    }),
  );
});
