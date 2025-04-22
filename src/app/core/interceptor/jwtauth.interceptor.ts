import { Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler, HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtauthInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  // if (request.headers.get('Anonymous') !== undefined) {
  //   request.headers.delete('Anonymous');
  //   const newRequest = request.clone();
  //   return next.handle(newRequest);
  // } else {
  //   const localToken = sessionStorage.getItem('token');
  //   request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localToken)});
  //   return next.handle(request);
  // }


    const localToken = sessionStorage.getItem('token');
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localToken)});
    return next.handle(request);
 

  	
  }
}