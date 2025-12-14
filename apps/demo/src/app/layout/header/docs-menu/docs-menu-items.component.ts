import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Repository } from '../../../state/config/config.model';
import { CodeUrlPipe } from '../pipes/code-url.pipe';

@Component({
  selector: 'app-docs-menu-items',
  imports: [RouterLink, RouterLinkActive, MatMenuModule, CodeUrlPipe],
  templateUrl: './docs-menu-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsMenuItemsComponent {
  readonly repository = input<Repository>(undefined);
  readonly library = input<string>(undefined);
  readonly app = input<string>(undefined);
}
