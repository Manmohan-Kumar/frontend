import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../users/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private contactService: ContactService) { }

  status: string;
  contact = new Contact();

  ngOnInit() {
  }

  register(contact) {
    console.log(contact);
    this.contactService.register(this.contact).
    subscribe(res => { this.status = res; }, console.error);
    this.router.navigate(['./']);
    console.log(status);
  }

}
