import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconService {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  register(): void {
    this.iconRegistry.addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/github.svg'));
  }
}
