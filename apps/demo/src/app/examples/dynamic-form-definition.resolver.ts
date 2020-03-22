import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { NotificationMessages, NotificationType } from '../state/notifications/notifications.model';
import { NotificationsService } from '../state/notifications/notifications.service';

@Injectable()
export class DynamicFormDefinitionResolver implements Resolve<Observable<DynamicFormDefinition>> {
  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<DynamicFormDefinition> {
    const definitionId = route.params.definitionId;
    const request = this.httpClient.get<DynamicFormDefinition>(`./assets/examples/${ definitionId }.json`);
    const messages = this.getNotificationMessages();
    return this.notificationsService.pipe(request, messages);
  }

  private getNotificationMessages(): NotificationMessages {
    const info = { type: NotificationType.Info, title: `Loading definition started`, duration: 2000 };
    const success = { type: NotificationType.Info, title: `Loading definition succeeded`, duration: 2000 };
    const error = { type: NotificationType.Error, title: `Loading definition failed`, duration: 3000 };
    return { info, success, error };
  }
}
