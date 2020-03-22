import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationMessages, NotificationType } from '../state/notifications/notifications.model';
import { NotificationsService } from '../state/notifications/notifications.service';

@Injectable()
export class DynamicFormModelResolver implements Resolve<Observable<any>> {
  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any> {
    const modelId = route.params.modelId;
    const request = this.httpClient.get(`./assets/examples/models/${ modelId }.json`);
    const messages = this.getNotificationMessages();
    return this.notificationsService.pipe(request, messages);
  }

  private getNotificationMessages(): NotificationMessages {
    const info = { type: NotificationType.Info, title: `Loading model started`, duration: 2000 };
    const success = { type: NotificationType.Info, title: `Loading model succeeded`, duration: 2000 };
    const error = { type: NotificationType.Error, title: `Loading model failed`, duration: 3000 };
    return { info, success, error };
  }
}
