import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../users/contact.model';
import { ContactService } from '../service/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private contactService: ContactService) { }
  contactSubs: Subscription;
  contact = new Contact();

  ngOnInit() {
  }

  displayName : string
  password : string

  login() {
    this.contactSubs = this.contactService.login(this.displayName, this.password).
    subscribe(res => { this.contact = res; console.log(this.contact); this.authenticate(this.contact);}, console.error);
    
    console.log(this.contactSubs);

  }

  authenticate(loggedInUser :  Contact) {
    console.log(loggedInUser[0]);    
    this.contactService.loginUser(loggedInUser[0]);
    this.router.navigate(['./chat']);
    
  }

  // login() : void {
  //   if(this.displayName == 'admin' && this.password == 'admin'){
  //    this.router.navigate(["app"]);
  //   }else {
  //     alert("Invalid credentials");
  //   }
  // }


}
