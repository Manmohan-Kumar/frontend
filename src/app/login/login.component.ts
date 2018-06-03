import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../users/contact.model';
import { ContactService } from '../service/contact.service';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  contactSubs: Subscription;
  displayName: string;
  password: string;
  contact = new Contact();

  ngOnInit() {
  }

  login() {
    this.contactSubs = this.authService.login(this.displayName, this.password).
    subscribe(res => {
      this.contact = res;
      console.log(res);
      console.log(this.contact);
      this.authenticate(this.contact, res); }, console.error);

    console.log(this.contactSubs);

  }

  authenticate(loggedInUser:  Contact, res: any) {
    status = res.message;
    console.log(status);
    if (isNullOrUndefined(status)) {
      console.log('user not present');
      this.router.navigate(['./']);
    } else {
      console.log(res.jwt_token);
      this.contact = res.user[0];
      this.authService.loginUser(this.contact);
      localStorage.setItem('currentUser', JSON.stringify({username: this.contact.display_name, token: res.jwt_token }));
      localStorage.setItem('sender_id', JSON.stringify(this.contact.user_id));
      localStorage.setItem('expires_at', JSON.stringify(res.expiresIn.valueOf()) );
      this.router.navigate(['./chat']);
    }
    /*if (isNullOrUndefined(loggedInUser[0])) {
      console.log('user not present');
      this.router.navigate(['./']);
    } else {
      this.contactService.loginUser(loggedInUser[0]);
      this.router.navigate(['./chat']);
    }*/

  }

  // login() : void {
  //   if(this.displayName == 'admin' && this.password == 'admin'){
  //    this.router.navigate(["app"]);
  //   }else {
  //     alert("Invalid credentials");
  //   }
  // }


}
