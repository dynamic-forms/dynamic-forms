import { Component, ElementRef, computed, inject, input, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs';
import { ThemeClass } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss',
})
export class DocsComponent {
  private readonly store = inject(Store);
  private readonly sanitizer = inject(DomSanitizer);

  readonly title = input<string>(undefined);
  readonly sourceUrl = input<string>(undefined);
  readonly scrolling = input<boolean>(undefined);
  readonly trustedSourceUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.sourceUrl()));
  readonly iframe = viewChild<ElementRef<HTMLIFrameElement>>('iframe');

  constructor() {
    this.store
      .select(PreferencesState.themeClass)
      .pipe(takeUntilDestroyed(), distinctUntilChanged())
      .subscribe(themeClass => this.setThemeClass(themeClass));
  }

  updateThemeClass(): void {
    const themeClass = this.store.selectSnapshot(PreferencesState.themeClass);
    this.setThemeClass(themeClass);
  }

  private setThemeClass(themeClass: ThemeClass): void {
    const document = this.iframe()?.nativeElement.contentWindow?.document;
    if (!document) {
      return;
    }

    if (themeClass === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
