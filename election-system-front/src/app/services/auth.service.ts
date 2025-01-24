//Import Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserLogged } from '../api/userLogged';


const API_AUTH_URL = environment.baseApiUrl+'/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser:UserLogged=new UserLogged();
  public userLogged:AsyncSubject<boolean>= new AsyncSubject<boolean>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {
    if(this.currentUser == null || this.currentUser ==undefined){
      if(this.router.url != 'auth/login' && (sessionStorage.getItem(environment.authTokenKey)==null || sessionStorage.getItem(environment.authTokenKey)==undefined)){
        this.router.navigate(['auth/login'], {relativeTo: this.activatedRoute});
      }
    }
  }

  public loginUser(email : string, password : string) : Observable<any>{
      const httpHeaders = new HttpHeaders(); 
        
      return this.http.post(API_AUTH_URL+"/login", { email, password },{ headers: httpHeaders })
      .pipe(
          map((response:any) => {
              if (response['status']=="success")
              {
                sessionStorage.setItem(environment.authTokenKey,response['data'].token);
                return true;
              }
              else
              {
                sessionStorage.setItem("errorLogin",response["error "]);
                return false;
              }
          })
      );
  }

}
