import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatInputModule, MatFormFieldModule, MatFormField, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Contact } from '../users/contact.model';
import { ContactService } from '../service/contact.service';


@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent implements OnInit {

  sender_id: string;
  //sender_id= '4';
  status: string;
  //contact: Contact;
  contact: Map<string, string>;
  constructor(public dialog: MatDialog, private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.user.subscribe(user => this.sender_id = user.user_id);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data: { sender_id: this.sender_id, contact: this.contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.contact = result;
      this.addContact();
    });
  }

  addContact() {
    this.contactService.addContact(this.contact).
    subscribe(res => { this.status = res; }, console.error);
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