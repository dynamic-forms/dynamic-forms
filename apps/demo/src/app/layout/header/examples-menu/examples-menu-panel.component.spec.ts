import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplesMenuPanelComponent } from './examples-menu-panel.component';

describe('ExamplesMenuPanelComponent', () => {
  let fixture: ComponentFixture<ExamplesMenuPanelComponent>;
  let component: ExamplesMenuPanelComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesMenuPanelComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
