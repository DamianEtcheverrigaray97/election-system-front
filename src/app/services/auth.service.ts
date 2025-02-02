//Import Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../api/apiResponse';
import { LoginReponse } from '../api/login';


const API_AUTH_URL = environment.baseApiUrl+'/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

 public loginUser(email: string, password: string): Observable<ApiResponse<LoginReponse>> {
    const httpHeaders = new HttpHeaders();

    return this.http
      .post<ApiResponse<LoginReponse>>(API_AUTH_URL + '/login', { email, password }, { headers: httpHeaders })
      .pipe(
        map((response) => {
          if (response.status === 'success' && response['data']?.token) {
            // Si el login es exitoso, almacenar el token
            sessionStorage.setItem(environment.authTokenKey,response['data'].token);
          } else {
            // Si el login falla, almacenar el error
            sessionStorage.setItem('errorLogin', response.error || 'Unknown error');
          }
          // Retornar la respuesta completa
          return response;
        })
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse<{ message: string }>> {
    const body = { currentPassword, newPassword };
    return this.http.put<ApiResponse<{ message: string }>>(`${API_AUTH_URL}/change-password`, body);
  }
  
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(environment.authTokenKey);
    return !!token;
  }
}
