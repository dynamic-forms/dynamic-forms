import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const setHeaders = this.getCacheHeaders();
    return next.handle(request.clone({ setHeaders }));
  }

  private getCacheHeaders(): { [key: string]: string } {
    return {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };
  }
}
