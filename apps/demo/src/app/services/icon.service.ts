import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconService {
  private readonly _svgs: Record<string, string> = {
    github: 'assets/images/github.svg',
    'azure-devops': 'assets/images/azure-devops.svg',
  };

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {}

  register(): void {
    Object.keys(this._svgs).forEach(svg => {
      const svgPath = this._svgs[svg];
      const svgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(svgPath);
      this.iconRegistry.addSvgIcon(svg, svgUrl);
    });
  }
}
