import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return next.handle(httpRequest.clone({headers}));
  }
  //
  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   console.log('test 1')
  //   this.tokenService.invalidToken();
  // }
}






