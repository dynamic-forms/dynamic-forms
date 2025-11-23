import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BootstrapExamplesComponent } from './bootstrap-examples.component';

describe('BootstrapExamplesComponent', () => {
  let fixture: ComponentFixture<BootstrapExamplesComponent>;
  let component: BootstrapExamplesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(BootstrapExamplesComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
