import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownComponent } from './markdown.component';
import { MarkdownElement } from './markdown.element';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has markdown element with source', () => {
    fixture.componentRef.setInput('source', './assets/testing/01_markdown.md');

    fixture.detectChanges();

    expect(component.element).toBeInstanceOf(MarkdownElement);
    expect(component.element.source).toBe('./assets/testing/01_markdown.md');

    fixture.componentRef.setInput('source', './assets/testing/02_markdown.md');

    fixture.detectChanges();

    expect(component.element).toBeInstanceOf(MarkdownElement);
    expect(component.element.source).toBe('./assets/testing/02_markdown.md');
  });
});
