import { inject, Injectable } from '@angular/core';
import { AuthAPI } from '../base/auth-api';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { Password, PasswordResponse } from '../interfaces/password.interface';
import { Signup, SignupResponse } from '../interfaces/signup.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { AuthEndpoints } from '../enums/AuthEndpoints';
import { getLoggedUser } from '../../../../src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthAPI {
    private _http=inject(HttpClient)


  constructor() { }
  
  login(data: LoginRequest): Observable<LoginResponse>  {
    return this._http.post<LoginResponse>(environment.baseUrl+AuthEndpoints.LOGIN,data)

   }
  register(data: Signup): Observable<SignupResponse> {
    return this._http.post<SignupResponse>(environment.baseUrl+AuthEndpoints.REGISTER,data)
   }
  changePassword(data: Password): Observable<PasswordResponse> {
    return this._http.patch<PasswordResponse>(environment.baseUrl+AuthEndpoints.CHANGE_PASSWORD,data)
  }
  uploadProfilePhoto(data: FormData): Observable<String> {
    return this._http.put<String>(environment.baseUrl+AuthEndpoints.upload_profile_photo,data) 
  }
  getLoggedUser(): Observable<getLoggedUser> {
    return this._http.get<getLoggedUser>(environment.baseUrl+AuthEndpoints.get_logged_user)
  }

}
