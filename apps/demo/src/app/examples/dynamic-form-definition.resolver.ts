import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { NotificationMessages } from '../state/notifications/notifications.model';
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
    const info = this.notificationsService.getInfoMessage(`Loading definition started`);
    const success = this.notificationsService.getInfoMessage(`Loading definition succeeded`);
    const error = this.notificationsService.getErrorMessage(`Loading definition failed`);
    return { info, success, error };
  }
}
