import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { Example } from '../state/examples/examples.model';
import { NotificationsService } from '../state/notifications/notifications.service';

@Injectable()
export class FormExampleLoader {
  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  loadDefinition(fileUrl: string): Observable<DynamicFormDefinition> {
    const request = this.httpClient.get<DynamicFormDefinition>(fileUrl);
    const messages = this.notificationsService.getMessages(
      'Loading definition started',
      'Loading definition succeeded',
      'Loading definition failed',
    );
    return this.notificationsService.pipe(request, messages);
  }

  loadDefinitionForExample(example: Example): Observable<DynamicFormDefinition> {
    const file = example.path ? `${example.path}/${example.id}.json` : `${example.id}.json`;
    return this.loadDefinition(`./assets/examples/${file}`);
  }

  loadModel(fileUrl: string): Observable<any> {
    const request = this.httpClient.get<any>(fileUrl);
    const messages = this.notificationsService.getMessages('Loading model started', 'Loading model succeeded', 'Loading model failed');
    return this.notificationsService.pipe(request, messages);
  }

  loadModelForExample(example: Example, modelId: string): Observable<any> {
    const file = example.path ? `${example.path}/models/${modelId}.json` : `models/${modelId}.json`;
    return this.loadModel(`./assets/examples/${file}`);
  }
}
