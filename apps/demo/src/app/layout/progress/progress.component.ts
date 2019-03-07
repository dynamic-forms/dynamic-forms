import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProgressState } from './../../state/progress/progress.state';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  state$: Observable<ProgressState>;

  constructor(private store: Store) {
    this.state$ = this.store.select(ProgressState);
  }
}
