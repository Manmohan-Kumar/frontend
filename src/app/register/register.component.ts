import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../users/contact.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  
  status : string;
  contact = new Contact();

  ngOnInit() {
  }

  register(contact){
    console.log(contact);
    this.contactService.register(this.contact).
    subscribe(res => { this.status = res; }, console.error);
    console.log(status);
  } 

}
