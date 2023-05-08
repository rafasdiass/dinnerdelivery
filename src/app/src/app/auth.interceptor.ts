import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TokenRefreshService } from './services/token-refresh.service';

@Injectable() // Adicione o decorador @Injectable() aqui
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenRefreshService: TokenRefreshService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          error.error.message === 'Token has expired'
        ) {
          return this.tokenRefreshService.refreshToken().pipe(
            tap(() => {
              const newToken = localStorage.getItem('token');
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
            }),
            switchMap(() => {
              return next.handle(req);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
