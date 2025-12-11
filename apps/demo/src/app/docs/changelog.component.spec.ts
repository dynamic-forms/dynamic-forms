import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangelogComponent } from './changelog.component';

describe('ChangelogComponent', () => {
  let fixture: ComponentFixture<ChangelogComponent>;
  let component: ChangelogComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
