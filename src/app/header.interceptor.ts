import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
public isLoading$: BehaviorSubject<boolean>
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
<<<<<<< Updated upstream
    const token = sessionStorage.getItem('token');
    
=======
    const token = sessionStorage.getItem('profains');
    this.isLoading$ = new BehaviorSubject(true)
    console.log(this.isLoading$)
>>>>>>> Stashed changes
    // If a token is present, add it to the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization:token
        }
      });
    }

    // Pass control to the next interceptor in the chain or to the HTTP client if there are no more interceptors
    return next.handle(request).pipe(tap(
      event=>{
        this.isLoading$.next(false)
        console.log(this.isLoading$)
      }
    ))
    };
  }

