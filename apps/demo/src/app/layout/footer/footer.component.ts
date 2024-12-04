import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CONFIG, Config } from '../../state/config/config.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [AsyncPipe, MatButtonModule, MatToolbarModule],
})
export class FooterComponent {
  @Select(CONFIG)
  config$: Observable<Config>;
}
