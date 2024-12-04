import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss',
})
export class DocsComponent {
  private _sourceUrl: string;
  private _trustedSourceUrl: SafeResourceUrl;

  @Input()
  title: string;

  @Input()
  get sourceUrl(): string {
    return this._sourceUrl;
  }
  set sourceUrl(value: string) {
    this._sourceUrl = value;
    this._trustedSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  @Input()
  scrolling: boolean;

  constructor(private sanitizer: DomSanitizer) {}

  get trustedSourceUrl(): SafeResourceUrl {
    return this._trustedSourceUrl;
  }
}
