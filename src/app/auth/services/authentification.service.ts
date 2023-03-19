import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loginUrl = 'http://localhost:8080/api/v1/auth/authenticate';


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
     console.log('Sending request with body:', body);
    return this.http.post<any>(this.loginUrl, { email, password }, { headers }).pipe(
      map(response => {
        // login successful if there's a jwt token in the response
        const token = response && response.token;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email, token }));
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Authentication error:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getTokenLog(): String {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string );
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }
  isLoggedIn(): boolean {
    // check if user is logged in based on presence of token in local storage
    const token: String = this.getTokenLog();
    console.log(token);
    if(token && token.length > 0 )
      return true;
    return false;
  }




}
