import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../users/contact.model';
import { Router } from '@angular/router';
import { CountryService } from '../service/country.service';
import { Country } from '../models/country.modal';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { isNumber } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  countryCtrl: FormControl;
  filteredCountries: Observable<any[]>;
  countryList: Country[];

  constructor(private router: Router,
    private contactService: ContactService,
    private countryService: CountryService) {
    this.countryCtrl = new FormControl();
    this.getCountries();
  }
  status: string;
  contact = new Contact();

  ngOnInit() {

  }
  getCountries() {
    this.countryService.getCountries().
      subscribe(res => { this.countryList = res; this.fetch(res); }, error => { console.error });
  }
  fetch(res: any) {
    this.countryList = res;
    this.filteredCountries = this.countryCtrl.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this.filterCountries(country) : this.countryList.slice())
      );
  }
  filterCountries(name: string) {
    console.log(name);
    if(isNumber(name)){
      return this.countryList.filter(country => country.phonecode == name);
    }
    return this.countryList.filter(country => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  register() {    
    this.contact.country_phone_code = this.countryCtrl.value;
    console.log(this.contact);
    this.contactService.register(this.contact).
      subscribe(res => { this.status = res; }, console.error);
    this.router.navigate(['./']);
    console.log(status);
  }

}
