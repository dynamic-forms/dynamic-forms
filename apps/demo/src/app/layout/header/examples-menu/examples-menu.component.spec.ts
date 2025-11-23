import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { ExamplesState } from '../../../state/examples/examples.state';
import { ExamplesMenuComponent } from './examples-menu.component';

describe('ExamplesMenuComponent', () => {
  let fixture: ComponentFixture<ExamplesMenuComponent>;
  let component: ExamplesMenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ExamplesState])],
    });

    fixture = TestBed.createComponent(ExamplesMenuComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
