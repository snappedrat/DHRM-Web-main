import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    
    // If a token is present, add it to the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization:token
        }
      });
    }

    // Pass control to the next interceptor in the chain or to the HTTP client if there are no more interceptors
    return next.handle(request);
  }
}
