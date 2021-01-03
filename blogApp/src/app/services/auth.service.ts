import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: any = null;

  constructor(private http: HttpClient)
  {
    this.isLogged();
  }

  login(login: any, password: any): Observable<any>
  {
    return this.http.post(`${URL}/login`, { login: login, password: password }, { withCredentials: true });
  }

  logout(): Observable<any>
  {
    console.log('logged out');
    return this.http.get(`${URL}/logout`, { withCredentials: true });
  }

  register(firstName: any, lastName: any, login: any, password: any): Observable<any>
  {
    return this.http.post(`${URL}/register`, { firstName: firstName, lastName: lastName, login: login, password: password }, { withCredentials: true });
  }

  isLogged()
  {
    this.http.get(`${URL}/islogged`, { withCredentials: true }).subscribe(
      (connectedUser) =>
      {
        this.connectedUser = connectedUser;
        console.log(this.connectedUser);
        console.log('connected');
      },
      (err) =>
      {
        console.log('not connected');
      }
    )
  }
}
