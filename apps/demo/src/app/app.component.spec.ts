import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotificationsComponent } from './layout/notifications/notifications.component';
import { ProgressComponent } from './layout/progress/progress.component';
import { IconService } from './services/icon.service';
import { ConfigService } from './state/config/config.service';
import { RoutingHandler } from './state/routing/routing.handler';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
      ],
      providers: [
        { provide: ConfigService, useValue: { load: () => {} } },
        { provide: IconService, useValue: { register: () => {} } },
        { provide: RoutingHandler, useValue: {} },
      ],
    })
    .overrideTemplate(HeaderComponent, '')
    .overrideTemplate(ContentComponent, '')
    .overrideTemplate(FooterComponent, '')
    .overrideTemplate(ProgressComponent, '')
    .overrideTemplate(NotificationsComponent, '');

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
