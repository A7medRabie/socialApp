import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { Signup, SignupResponse } from '../interfaces/signup.interface';
import { Password, PasswordResponse } from '../interfaces/password.interface';
import { getLoggedUser } from '../../../../src/app/core/interfaces/user.interface';
 
export abstract class AuthAPI {
  /**
   * @summary This method is used to submit the login details of the user and return the result from backend
   * @param data the data submitted in [ Login ] Form
   * @returns Observable
   */
  abstract login(data: LoginRequest): Observable<LoginResponse>
  abstract register(data: Signup): Observable<SignupResponse>;
  abstract changePassword(data: Password): Observable<PasswordResponse>;
  abstract uploadProfilePhoto(data: FormData): Observable<String>;
  abstract getLoggedUser(): Observable<getLoggedUser>;
}

 
