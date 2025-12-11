import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { ConfigState } from '../../../state/config/config.state';
import { DocsMenuComponent } from './docs-menu.component';

describe('DocsMenuComponent', () => {
  let fixture: ComponentFixture<DocsMenuComponent>;
  let component: DocsMenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ConfigState])],
    });

    fixture = TestBed.createComponent(DocsMenuComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
