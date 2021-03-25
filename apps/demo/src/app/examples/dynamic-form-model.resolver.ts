import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Example } from '../state/examples/examples.model';
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
    const example = route.parent.data.example as Example;
    const file = example.path ? `${ example.path}/models/${ modelId }.json` : `models/${ modelId }.json`;
    const request = this.httpClient.get(`./assets/examples/${ file }`);
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
