import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { Example } from '../state/examples/examples.model';
import { NotificationMessages } from '../state/notifications/notifications.model';
import { NotificationsService } from '../state/notifications/notifications.service';

@Injectable()
export class FormDefinitionResolver implements Resolve<Observable<DynamicFormDefinition>> {
  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<DynamicFormDefinition> {
    const example = route.parent.data.example as Example;
    const file = example.path ? `${ example.path}/${ example.id }.json` : `${ example.id }.json`;
    const request = this.httpClient.get<DynamicFormDefinition>(`./assets/examples/${ file }`);
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
