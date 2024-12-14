import { Component, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss',
})
export class DocsComponent {
  readonly title = input<string>(undefined);
  readonly sourceUrl = input<string>(undefined);
  readonly scrolling = input<boolean>(undefined);
  readonly trustedSourceUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.sourceUrl()));

  constructor(private sanitizer: DomSanitizer) {}
}
