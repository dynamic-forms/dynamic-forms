import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExampleMenuItem } from '../../../state/examples/examples.model';
import { ExamplesState } from '../../../state/examples/examples.state';

@Component({
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
})
export class EditorMenuComponent {
  @Select(ExamplesState.menuItems)
  items$: Observable<ExampleMenuItem[]>;
}
