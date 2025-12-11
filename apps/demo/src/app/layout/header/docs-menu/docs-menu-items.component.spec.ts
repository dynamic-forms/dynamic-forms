import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DocsMenuItemsComponent } from './docs-menu-items.component';

describe('DocsMenuItemsComponent', () => {
  let fixture: ComponentFixture<DocsMenuItemsComponent>;
  let component: DocsMenuItemsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(DocsMenuItemsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
