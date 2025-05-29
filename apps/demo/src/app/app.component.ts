import { Component } from '@angular/core';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotificationsComponent } from './layout/notifications/notifications.component';
import { ProgressComponent } from './layout/progress/progress.component';

@Component({
  selector: 'app-root',
  imports: [ContentComponent, FooterComponent, HeaderComponent, NotificationsComponent, ProgressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
