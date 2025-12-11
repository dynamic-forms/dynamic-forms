import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorMenuPanelComponent } from './editor-menu-panel.component';

describe('EditorMenuPanelComponent', () => {
  let fixture: ComponentFixture<EditorMenuPanelComponent>;
  let component: EditorMenuPanelComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMenuPanelComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
