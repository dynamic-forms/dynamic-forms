import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { LayoutState } from '../../state/layout/layout.state';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let component: ContentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([LayoutState])],
    });

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
