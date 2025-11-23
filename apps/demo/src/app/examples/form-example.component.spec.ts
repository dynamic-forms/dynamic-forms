import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormExampleComponent } from './form-example.component';

describe('FormExampleComponent', () => {
  let fixture: ComponentFixture<FormExampleComponent>;
  let component: FormExampleComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExampleComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
