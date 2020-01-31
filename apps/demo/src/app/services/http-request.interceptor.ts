import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const setHeaders = this.getCacheHeaders();
    return next.handle(request.clone({ setHeaders }));
  }

  private getCacheHeaders() {
    return {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };
  }
}
