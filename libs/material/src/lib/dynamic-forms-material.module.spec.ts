import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormsMaterialModule } from './dynamic-forms-material.module';

describe('DynamicFormsMaterialModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormsMaterialModule.forRoot()
      ],
    }).compileComponents();
  }));

  it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (configService) => {
    expect(configService).toBeDefined();
  }));
});
