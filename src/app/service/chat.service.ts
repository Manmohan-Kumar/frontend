import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { API_URL } from '../env';
import { Observable } from 'rxjs';
import { Chat } from '../chat/chat.modal';

@Injectable()
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  getChatHistory(sender_id: string, receiver_id: string): Observable<Chat[]> {
    // sender_id = 4;
    let params = new HttpParams().set('sender_id', sender_id).set('receiver_id', receiver_id);
    
    return this.httpClient.
    get<Chat[]>(`${API_URL}/getChatHistory`, {headers: this.httpOptions.headers, params: params});
  }

}
