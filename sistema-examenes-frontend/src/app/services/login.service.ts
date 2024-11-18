import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private htpp: HttpClient) {
    //generamos el token
  }
  public generateToken(loginData: any) {
    return this.htpp.post(`${baseUrl}/generate-token`, loginData);
  }
  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
  }
  public isLoggendIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }
  //cerramos sesion y eliminamos el token del localStorage
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  //obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut
      return null;
    }
  }
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  public getCurrentUser() {
    return this.htpp.get(`${baseUrl}/actual-usuario`);
  }
}
