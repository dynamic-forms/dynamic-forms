import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MaterialExamplesComponent } from './material-examples.component';

describe('MaterialExamplesComponent', () => {
  let fixture: ComponentFixture<MaterialExamplesComponent>;
  let component: MaterialExamplesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(MaterialExamplesComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
