import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService, DynamicFormInputBase, DynamicFormLibraryService,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';
import { BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors.module';

@Component({
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [
    BsDynamicFormControlErrorsModule
  ],
  declarations: [
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' })
    },
    DynamicFormConfigService,
    DynamicFormValidationService
  ]
})
class BsDynamicFormControlLabelTestModule {}

describe('BsDynamicFormControlErrorsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlErrorsComponent>;
  let component: BsDynamicFormControlErrorsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelTestModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormControlErrorsComponent);
    component = fixture.componentInstance;
    component.field = { errors: { required: { message: 'This field is required.' } }, showErrors: true } as any;

    const resolver = TestBed.inject(ComponentFactoryResolver);
    const factory = resolver.resolveComponentFactory(DynamicFormInputTestComponent);
    component.component = component.ref.createComponent<DynamicFormInputTestComponent>(factory).instance;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders component template', () => {
    const errorsDebugElement = fixture.debugElement.query(By.css('div.invalid-feedback'));
    const errorsElement = errorsDebugElement.nativeElement as HTMLLabelElement;

    expect(errorsElement).toBeTruthy();
    expect(errorsElement.innerText).toBe('This field is required.');
  });
});
