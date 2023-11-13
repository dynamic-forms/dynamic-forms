import { Component, NgModule, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormFieldWrapperBase } from './dynamic-form-field-wrapper-base';

@Component({
  selector: 'dynamic-form-field-wrapper-test',
  template: `<ng-template #container></ng-template>`,
})
class DynamicFormFieldWrapperTestComponent extends DynamicFormFieldWrapperBase {
  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(containerRef, validationService);
  }
}

@Component({
  selector: 'dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`,
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  declarations: [DynamicFormFieldWrapperTestComponent, DynamicFormInputTestComponent],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' }),
    },
    DynamicFormValidationService,
  ],
})
class DynamicFormFieldWrapperTestModule {}

describe('DynamicFormFieldWrapper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormFieldWrapperTestModule],
    });
  });

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormFieldWrapperTestComponent);
    const component = fixture.componentInstance;

    component.component = component.ref.createComponent(DynamicFormInputTestComponent).instance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
