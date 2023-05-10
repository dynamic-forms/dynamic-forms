import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Config, CONFIG } from '../../state/config/config.model';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, MatButtonModule, MatToolbarModule],
})
export class FooterComponent {
  @Select(CONFIG)
  config$: Observable<Config>;
}
