import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatInputModule, MatFormFieldModule, MatFormField, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Contact } from '../users/contact.model';
import { ContactService } from '../service/contact.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent implements OnInit {

  sender_id: string;
  sender_name: string;
  status: string;
  contact: Map<string, string>;
  contactList: Contact[];
  contactListSubs: Subscription;
  constructor(public dialog: MatDialog, private contactService: ContactService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {this.sender_id = user.user_id, this.sender_name = user.display_name; });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data: { sender_id: this.sender_id, sender_name: this.sender_name, contact: this.contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (!isNullOrUndefined(result)) {
        this.contact = result;
        this.addContact();
      }
      this.getContactList();
    });
  }

  addContact() {
    this.contactService.addContact(this.contact).
    subscribe(res => { this.status = res; console.log(res); this.contactService.setAddedContact(res); }, console.error);
  }

  getContactList() {
    this.contactListSubs = this.contactService.getContacts(this.sender_id).
      subscribe(res => { this.contactList = res; }, console.error);
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
