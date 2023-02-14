import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { NotificationMessages } from '../state/notifications/notifications.model';
import { NotificationsService } from '../state/notifications/notifications.service';

@Injectable()
export class FormDefinitionLoader {
  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  load(fileUrl: string): Observable<DynamicFormDefinition> {
    const request = this.httpClient.get<DynamicFormDefinition>(fileUrl);
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
