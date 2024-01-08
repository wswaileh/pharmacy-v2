import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { TokenService } from '../facade-services/token/token.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  notAuthorizedMsg = 'You have insufficient privileges to access this page';

  constructor(
    private tokenService: TokenService,
    private route: Router,
    private notificationService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request, this.tokenService.getToken());
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          const statusCode = (error as HttpErrorResponse).status;
          if ([400, 401, 404, 403].includes(statusCode)) {
            const result = this.handle400StatusCodes(error, statusCode);
            if (result) {
              return result;
            }
          } else {
            console.error('500Error: ', error);
            return this.handle500Error(error);
          }
        }
        console.error('NoneHttpError: ', error);
        return throwError(error);
      }),
      finalize(() => {})
    );
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return req;
  }

  handle400StatusCodes(error: HttpErrorResponse, statusCode: number) {
    if (statusCode === 400) {
      return this.handle400Error(error);
    } else if (statusCode === 401) {
      return this.handle401Error(error);
    } else if (statusCode === 404) {
      return this.handle404Error(error);
    } else {
      return this.handle403Error(error);
    }
  }

  handle400Error(error: HttpErrorResponse): Observable<never> {
    this.showError(error?.message ?? 'An error occurred');
    return throwError(error);
  }

  handle401Error(error: HttpErrorResponse) {
    this.handleUnAuthorized();
    this.tokenService.removeToken();
    return throwError(error);
  }

  handle403Error(error: HttpErrorResponse): Observable<never> {
    this.handleUnAuthorized();
    this.tokenService.removeToken();
    return throwError(error);
  }

  handle404Error(error: HttpErrorResponse): Observable<never> {
    this.showError('Error 404: Resource Not Found');
    return throwError(error);
  }

  handle500Error(error: HttpErrorResponse): Observable<never> {
    const msg = `Something wrong occurred , would you like to refresh the page and try again?`;
    this.showError(msg);
    return throwError(error);
  }

  showError(detail: string): void {
    this.notificationService.add({
      severity: 'error',
      detail,
    });
  }

  handleUnAuthorized() {
    this.route.navigate(['/login'], {
      state: {
        msg: this.notAuthorizedMsg
      },
    });
    this.showError(
      this.notAuthorizedMsg
    );
  }
}
