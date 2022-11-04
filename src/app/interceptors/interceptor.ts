import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public router: Router, private httpClient: HttpClient) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return next.handle(httpRequest.clone({headers})).pipe(
      catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                if (error.error['message'] == "Invalid JWT Refresh Token") {
                  localStorage.removeItem('access_token')
                  localStorage.removeItem('refresh_token')
                  this.router.navigate(['/'])
                } else if(error.error['message'] == "Expired JWT Token"){
                  localStorage.setItem('access_token', '');
                  let refresh_token = localStorage.getItem('refresh_token');
                  this.httpClient.post<{ token: string }>("https:/127.0.0.1:8000/api/token/refresh", {refresh_token}).subscribe(el => {
                    localStorage.setItem('access_token', el.token);
                  });
                }
                break;
              case 404:
                console.log('Erreur Connexion Serveur');
            }
          }
          return throwError(error);
        }
      )
    );
  }

}






