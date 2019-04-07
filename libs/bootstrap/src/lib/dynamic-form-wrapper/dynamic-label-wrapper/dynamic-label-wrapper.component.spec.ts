import { async, TestBed } from '@angular/core/testing';
import { DynamicFormWrapperBootstrapModule } from './../dynamic-form-wrapper.module';
import { DynamicLabelWrapperBootstrapComponent } from './dynamic-label-wrapper.component';

describe('DynamicLabelWrapperBootstrapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormWrapperBootstrapModule
      ]
    });
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicLabelWrapperBootstrapComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
