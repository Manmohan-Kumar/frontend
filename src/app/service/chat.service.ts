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

  sendMessage(sender_id: string, receiver_id: string, country_phone_code: string,
    phone_number: string, message: string): Observable<any> {
    let body = JSON.stringify(
      {'sender_id': sender_id, 'receiver_id': receiver_id, 'receiver_countryPhoneCode': country_phone_code,
      'receiver_phoneNum': phone_number, 'message': message});
      console.log(body);
    return this.httpClient.post<any>(`${API_URL}/send-message`, body, this.httpOptions);
  }
}
