import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {API_URL} from '../env';
import { Contact } from '../users/contact.model';
import { isNullOrUndefined } from 'util';


@Injectable()
export class ContactService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  private contactSubject = new BehaviorSubject<Contact>(new Contact());
  cast = this.contactSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  selectedContact(newContact) {
    this.contactSubject.next(newContact);
    console.log(newContact);
  }

  // GET list of public, future events
  getContacts(sender_id: string): Observable<Contact[]> {
    if (isNullOrUndefined(sender_id)) {
      sender_id = localStorage.getItem('sender_id');
    }
    const body = JSON.stringify({'sender_id': sender_id});
    return this.http.post<Contact[]>(`${API_URL}/getContacts`, body, this.httpOptions);
  }

  addContact(contact: Map<string, string>): Observable<string> {
    const body = JSON.stringify({contact});
    return this.http.post<string>(`${API_URL}/addContact`, body, this.httpOptions);
  }

  register(contact: Contact): Observable<string> {
    const body = JSON.stringify({contact});
    return this.http.post<string>(`${API_URL}/register`, body, this.httpOptions);
  }
}
