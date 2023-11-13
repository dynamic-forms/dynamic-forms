import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DynamicFormConfigService,
  DynamicFormInputBase,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from './dynamic-form-input-wrapper.component';

@Component({
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`,
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [BsDynamicFormInputWrapperComponent],
  declarations: [DynamicFormInputTestComponent],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' }),
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
  ],
})
class BsDynamicFormControlLabelTestModule {}

describe('BsDynamicFormInputWrapperComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormInputWrapperComponent>;
  let component: BsDynamicFormInputWrapperComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormControlLabelTestModule],
    });

    fixture = TestBed.createComponent(BsDynamicFormInputWrapperComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
