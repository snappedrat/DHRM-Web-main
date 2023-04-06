import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderserviceService } from './loaderservice.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private loadder:LoaderserviceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    this.loadder.show()
    // If a token is present, add it to the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization:token
        }
      });
    }

    // Pass control to the next interceptor in the chain or to the HTTP client if there are no more interceptors
    return next.handle(request).pipe(tap((data:HttpEvent<any>)=>{
      if(data instanceof HttpResponse){
        this.loadder.hide()
      }
    },
    
    error=>{this.loadder.hide()}
    ));
  }
}
