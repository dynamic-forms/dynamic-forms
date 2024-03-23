import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Repository } from '../../../state/config/config.model';
import { CodeUrlPipe } from '../pipes/code-url.pipe';

@Component({
  standalone: true,
  selector: 'app-docs-menu-items',
  templateUrl: './docs-menu-items.component.html',
  styleUrl: './docs-menu-items.component.scss',
  imports: [RouterLink, RouterLinkActive, MatMenuModule, CodeUrlPipe],
})
export class DocsMenuItemsComponent {
  @Input()
  repository: Repository;

  @Input()
  library: string;
}
