import { Component, Input} from '@angular/core';
import { Repository } from '../../../state/config/config.model';

@Component({
  selector: 'app-docs-menu-items',
  templateUrl: './docs-menu-items.component.html',
  styleUrls: ['./docs-menu-items.component.scss']
})
export class DocsMenuItemsComponent {
  @Input()
  repository: Repository;

  @Input()
  library: string;
}
