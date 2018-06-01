import { Component, OnInit, HostListener } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from './contact.model';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private contactService: ContactService, private route: ActivatedRoute,
    private router: Router, ) { }
  contact$: Observable<Contact>;
  contactList: Contact[];
  contactListSubs: Subscription;
  selectedContact: Contact;
  contact: Contact;
  sender_id : string;

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.sender_id = params.get('id'))
    // );
    this.contactService.user.subscribe(user => this.sender_id = user.user_id);
    console.log(this.sender_id);
    this.getContactList();
    this.contactService.cast.subscribe(contact => this.contact = contact);
  }

  getContactList() {
    this.contactListSubs = this.contactService.getContacts(this.sender_id).
      subscribe(res => { this.contactList = res; }, console.error);
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService.selectedContact(contact);
    // console.log(contact.display_name);
  }

}
