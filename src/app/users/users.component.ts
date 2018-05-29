import { Component, OnInit, HostListener } from '@angular/core';
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
  contact: Contact;
  sender_id = '1';

  ngOnInit() {
    this.getContactList();
    this.contactService.cast.subscribe(contact=> this.contact = contact);    
  }

  getContactList() {
    this.contactListSubs = this.contactService.getContacts(this.sender_id).
    subscribe(res => { this.contactList = res; }, console.error);
  }
  
  onSelect(contact: Contact):void{
    this.selectedContact = contact;
    this.contactService.selectedContact(contact);
    // console.log(contact.display_name);
  }

}
