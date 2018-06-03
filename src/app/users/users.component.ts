import { Component, OnInit, HostListener } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from './contact.model';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private contactService: ContactService, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }
  contact$: Observable<Contact>;
  contactList: Contact[];
  contactListSubs: Subscription;
  selectedContact: Contact;
  contact: Contact;
  sender_id: string;

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.sender_id = params.get('id'))
    // );
    console.log('from user component');
    this.authService.user.subscribe(user => this.sender_id = user.user_id);
    console.log(this.sender_id);
    this.getContactList();
    this.contactService.cast.subscribe(contact => this.contact = contact);
  }

  getContactList() {
    this.contactListSubs = this.contactService.getContacts(this.sender_id).
      subscribe(res => { this.fetchContacts(res); }, console.error);
  }

  fetchContacts(res: any): void {
    console.log(isNullOrUndefined(res));
    console.log(res);
    if (!isNullOrUndefined(res) && res.status !== 'Logged Out') {
      this.contactList = res;
    } else {
      this.authService.logout();
    }
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService.selectedContact(contact);
    // console.log(contact.display_name);
  }

}
