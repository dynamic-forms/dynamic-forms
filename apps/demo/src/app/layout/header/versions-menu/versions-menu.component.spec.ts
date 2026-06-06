import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { ConfigState } from '../../../state/config/config.state';
import { VersionsMenuComponent } from './versions-menu.component';

describe('VersionsMenuComponent', () => {
  let fixture: ComponentFixture<VersionsMenuComponent>;
  let component: VersionsMenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ConfigState])],
    });

    fixture = TestBed.createComponent(VersionsMenuComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
