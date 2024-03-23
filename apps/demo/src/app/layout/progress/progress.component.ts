import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PROGRESS, Progress } from '../../state/progress/progress.model';

@Component({
  standalone: true,
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
  imports: [AsyncPipe, NgIf, MatProgressBarModule],
})
export class ProgressComponent {
  @Select(PROGRESS)
  progress$: Observable<Progress>;
}
