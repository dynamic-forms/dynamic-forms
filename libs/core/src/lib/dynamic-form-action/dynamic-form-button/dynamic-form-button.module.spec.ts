import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormButtonType, DynamicFormButtonModule } from './dynamic-form-button.module';

describe('DynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormButtonModule
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
      expect(types[0]).toEqual(dynamicFormButtonType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
