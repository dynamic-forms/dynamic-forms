import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { ExamplesState } from '../../../state/examples/examples.state';
import { EditorMenuComponent } from './editor-menu.component';

describe('EditorMenuComponent', () => {
  let fixture: ComponentFixture<EditorMenuComponent>;
  let component: EditorMenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ExamplesState])],
      teardown: { destroyAfterEach: false },
    });

    fixture = TestBed.createComponent(EditorMenuComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
