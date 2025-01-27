import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = sessionStorage.getItem(environment.authTokenKey); 

    // Si el token está presente, lo agregamos al encabezado Authorization
    if (userToken) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${userToken}`,  // formato estándar de "Bearer"
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores globales
        console.error('Error en la solicitud:', error);
        throw error; 
      })
    );
  }
}
