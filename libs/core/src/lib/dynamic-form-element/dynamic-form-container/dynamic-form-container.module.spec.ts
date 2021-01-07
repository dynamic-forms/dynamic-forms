import { inject, waitForAsync, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormContainerType, DynamicFormContainerModule } from './dynamic-form-container.module';

describe('DynamicFormContainerModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormContainerModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary)
        }
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPES',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const types = service.elementTypes;

      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormContainerType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
