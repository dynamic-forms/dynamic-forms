import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormIconType, DynamicFormIconModule } from './dynamic-form-icon.module';

describe('DynamicFormIconModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormIconModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary)
        }
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ACTION_TYPES',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const types = service.actionTypes;

      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormIconType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
