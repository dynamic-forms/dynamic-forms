import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormsBootstrapModule } from './dynamic-forms-bootstrap.module';

describe('DynamicFormsBootstrapModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormsBootstrapModule.forRoot()
      ],
    }).compileComponents();
  }));

  it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (configService) => {
    expect(configService).toBeDefined();
  }));
});
