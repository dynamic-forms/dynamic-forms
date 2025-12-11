import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { IconService } from './icon.service';

describe('IconService', () => {
  let domSanitizer: DomSanitizer;
  let iconRegistry: MatIconRegistry;
  let iconService: IconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(DomSanitizer, {
          bypassSecurityTrustResourceUrl: (url: string) => url,
        }),
        MockProvider(MatIconRegistry),
      ],
    });

    domSanitizer = TestBed.inject(DomSanitizer);
    iconRegistry = TestBed.inject(MatIconRegistry);
    iconService = TestBed.inject(IconService);
  });

  it('registers svg icons', () => {
    spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl');
    spyOn(iconRegistry, 'addSvgIcon');

    iconService.register();

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledTimes(2);
    expect(iconRegistry.addSvgIcon).toHaveBeenCalledTimes(2);
  });
});
