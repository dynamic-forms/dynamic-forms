import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { Observable, delay, firstValueFrom, of } from 'rxjs';
import { dynamicFormControlUniqueUsernameValidatorFactory } from './dynamic-form-extensions';

describe('Dynamic Form Extensions', () => {
  describe('dynamicFormControlUniqueUsernameValidatorFactory', () => {
    let httpClient: HttpClient;
    let asyncValidatorFn: AsyncValidatorFn;

    beforeEach(() => {
      httpClient = MockService(HttpClient);
      asyncValidatorFn = dynamicFormControlUniqueUsernameValidatorFactory(null, null, null, null, [httpClient]);
    });

    it('does not call http client and returns no error if value is empty', async () => {
      spyOn(httpClient, 'get');

      const control = new FormControl('');

      const result = await firstValueFrom(asyncValidatorFn(control) as Observable<any>);

      expect(result).toBeNull();
      expect(httpClient.get).toHaveBeenCalledTimes(0);
    });

    it('calls http client and returns no error if username is unique', async () => {
      spyOn(httpClient, 'get').and.returnValue(of(['username1']));

      const control = new FormControl('username2');

      const resultPromise = firstValueFrom(asyncValidatorFn(control) as Observable<any>);

      await firstValueFrom(of({}).pipe(delay(500)));

      const result = await resultPromise;

      expect(result).toBeNull();
      expect(httpClient.get).toHaveBeenCalledWith('./assets/data/usernames.json');
    });

    it('calls http client and returns error if username is not unique', async () => {
      spyOn(httpClient, 'get').and.returnValue(of(['username']));

      const control = new FormControl('username');

      const resultPromise = firstValueFrom(asyncValidatorFn(control) as Observable<any>);

      await firstValueFrom(of({}).pipe(delay(500)));

      const result = await resultPromise;

      expect(result).toEqual({ error: true });
      expect(httpClient.get).toHaveBeenCalledWith('./assets/data/usernames.json');
    });
  });
});
