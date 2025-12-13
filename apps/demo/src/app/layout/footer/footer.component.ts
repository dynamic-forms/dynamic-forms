import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngxs/store';
import { CONFIG } from '../../state/config/config.model';

@Component({
  selector: 'app-footer',
  imports: [AsyncPipe, MatButtonModule, MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly config$ = inject(Store).select(CONFIG);
}
