import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationMessages } from '../state/notifications/notifications.model';
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
    const info = this.notificationsService.getInfoMessage(`Loading model started`);
    const success = this.notificationsService.getInfoMessage(`Loading model succeeded`);
    const error = this.notificationsService.getErrorMessage(`Loading model failed`);
    return { info, success, error };
  }
}
