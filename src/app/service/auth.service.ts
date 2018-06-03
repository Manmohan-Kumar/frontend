import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Contact } from '../users/contact.model';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { API_URL } from '../env';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  public onLogin = new BehaviorSubject<boolean>(false);
  slider = this.onLogin.asObservable();

  // making logged in user as shared object
  private loggedInUser = new BehaviorSubject<Contact>(new Contact());
  user = this.loggedInUser.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }


  loginUser(sharedUser) {
    this.loggedInUser.next(sharedUser);
    console.log(sharedUser);
    this.onLogin.next(true);
  }

  login(display_name: string, password: string): Observable<Contact> {
    const body = JSON.stringify({'display_name': display_name, 'password': password});
    return this.http.post<Contact>(`${API_URL}/login`, body, this.httpOptions);
  }

  logout() {
    console.log('logut called');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sender_id');
    localStorage.removeItem('expires_at');
    this.router.navigate(['./login']);
}
}
