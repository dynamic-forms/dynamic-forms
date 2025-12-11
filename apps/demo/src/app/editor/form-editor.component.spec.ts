import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormLog } from '@dynamic-forms/core';
import { provideStore } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { Subject, delay, firstValueFrom, of } from 'rxjs';
import { FormLogger } from '../form/form-logger';
import { PreferencesState } from '../state/preferences/preferences.state';
import { FormEditorComponent } from './form-editor.component';

describe('FormEditorComponent', () => {
  let fixture: ComponentFixture<FormEditorComponent>;
  let component: FormEditorComponent;
  let logSubject: Subject<DynamicFormLog>;

  beforeEach(() => {
    logSubject = new Subject<DynamicFormLog>();

    TestBed.configureTestingModule({
      providers: [
        provideStore([PreferencesState]),
        MockProvider(FormLogger, { log$: logSubject.asObservable(), log: () => {} }, 'useValue'),
      ],
    });

    fixture = TestBed.createComponent(FormEditorComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has logs from logger', async () => {
    const logs = [{ message: 'message1' }, { message: 'message2' }] as DynamicFormLog[];

    logSubject.next(logs[0]);
    logSubject.next(logs[1]);

    await firstValueFrom(of({}).pipe(delay(2000)));

    expect(component.logs).toEqual([logs[1], logs[0]]);
  });

  it('has value from data', () => {
    const definition = { children: [] };
    const model = {};
    const data = { definition, model };

    component.data = data;

    expect(component.data).toBe(data);
    expect(component.value).toBeTruthy();
  });

  it('has data from value', () => {
    const definition = { children: [] };
    const value = JSON.stringify(definition);

    component.value = value;

    expect(component.data).toEqual({ definition, model: {} });
    expect(component.value).toBe(value);
  });

  it('logs error for invalid value', () => {
    const logger = TestBed.inject(FormLogger);
    spyOn(logger, 'log');

    component.value = 'invalid json';

    expect(component.value).toBe('invalid json');
    expect(logger.log).toHaveBeenCalledTimes(1);
  });
});
