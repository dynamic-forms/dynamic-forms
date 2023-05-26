import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Progress, PROGRESS } from '../../state/progress/progress.model';

@Component({
  standalone: true,
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [CommonModule, MatProgressBarModule],
})
export class ProgressComponent {
  @Select(PROGRESS)
  progress$: Observable<Progress>;
}
