import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {API_URL} from '../env';
import {Contact} from './contact.model';

@Injectable()
export class ContactService {

  // private countryUrl = API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getContacts(sender_id: number): Observable<Contact[]> {
    // sender_id = 4;
    let body = JSON.stringify({'sender_id': sender_id});
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post<Contact[]>(`${API_URL}/getContacts`, body, this.httpOptions);
  }
}
