import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {API_URL} from '../env';
import { Contact } from '../users/contact.model';


@Injectable()
export class ContactService {

  // private countryUrl = API_URL;

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

  selectedContact(newContact){
    this.contactSubject.next(newContact);
    console.log(newContact);
  }

  // GET list of public, future events
  getContacts(sender_id: string): Observable<Contact[]> {    
    // sender_id = 4;
    let body = JSON.stringify({'sender_id': sender_id});
    console.log(body);
    //const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post<Contact[]>(`${API_URL}/getContacts`, body, this.httpOptions);
  }

  addContact(contact: Map<string, string>): Observable<string> {
    // sender_id = 4;
    let body = JSON.stringify({contact});
    // console.log(body);
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post<string>(`${API_URL}/addContact`, body, this.httpOptions);
  }
}
