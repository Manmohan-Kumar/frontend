import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../env';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    // responseType: 'json' as 'json'
  };

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {    
    return this.http.get<Country[]>(`${API_URL}/getCountries`, this.httpOptions);
  }


}
