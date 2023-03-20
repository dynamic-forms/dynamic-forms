import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormTextType, DynamicFormTextModule } from './dynamic-form-text.module';

describe('DynamicFormTextModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextModule,
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
      expect(types[0]).toEqual(dynamicFormTextType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    }),
  );
});
