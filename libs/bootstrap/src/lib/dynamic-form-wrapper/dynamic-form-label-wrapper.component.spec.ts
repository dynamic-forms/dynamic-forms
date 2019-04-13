import { async, TestBed } from '@angular/core/testing';
import { DynamicFormLabelWrapperBootstrapComponent } from './dynamic-form-label-wrapper.component';
import { DynamicFormWrapperBootstrapModule } from './dynamic-form-wrapper.module';

describe('DynamicFormLabelWrapperBootstrapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormWrapperBootstrapModule
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormLabelWrapperBootstrapComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
