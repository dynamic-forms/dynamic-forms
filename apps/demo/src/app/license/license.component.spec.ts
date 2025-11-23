import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicenseComponent } from './license.component';

describe('LicenseComponent', () => {
  let fixture: ComponentFixture<LicenseComponent>;
  let component: LicenseComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
