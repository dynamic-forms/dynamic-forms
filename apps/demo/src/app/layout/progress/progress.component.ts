import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PROGRESS, Progress } from '../../state/progress/progress.model';

@Component({
  selector: 'app-progress',
  imports: [AsyncPipe, MatProgressBarModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  readonly progress$: Observable<Progress> = inject(Store).select(PROGRESS);
}
