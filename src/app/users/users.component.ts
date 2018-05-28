import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from './contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  contactList: Contact[];
  contactListSubs: Subscription;
  selectedContact: Contact;

  ngOnInit() {
    this.getContactList();
  }

  getContactList() {
    this.contactListSubs = this.contactService.getContacts(4).
    subscribe(res => { this.contactList = res; }, console.error);
  }

  onSelect(contact: Contact):void{
    this.selectedContact = contact;
    console.log(contact.display_name);
  }

}
