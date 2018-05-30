import { Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from './chat.modal';
import { ChatService } from '../service/chat.service';
import { Contact } from '../users/contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, private contactService : ContactService) { }
  contact: Contact;
  messageList: Chat[];
  messageListSubs: Subscription;
  old_contact: Contact;
  sender_id = '4';  

  ngOnInit() {
    this.contactService.cast.subscribe(contact=> this.contact = contact);
    this.getChatHistory("from oninit");
    this.old_contact = this.contact;
  }
  ngDoCheck(){
    if(this.old_contact!=this.contact){
       this.getChatHistory("from docheck");
       this.old_contact = this.contact;
    }
  }
  getChatHistory(name) {    
      // console.log(name + " Selected contact name " + this.contact.display_name);
    
      let receiver_id = this.contact.user_id==undefined?'1':this.contact.user_id;
      this.messageListSubs = this.chatService.getChatHistory(this.sender_id, receiver_id).
      subscribe(res => { this.messageList = res; console.log(res)}, console.error);    
  }

  sendMessage(message,contact){
    console.log("message to be sent is: " + message.value + " and receiver is : " + contact.user_id );
    let receiver_id = contact.user_id;
    this.chatService.sendMessage(this.sender_id, receiver_id, contact.country_phone_code,
       contact.phone_number, message.value).subscribe(res => console.log(res), err => console.log(err));
    let recentChat = new Chat(message.value,this.sender_id, receiver_id, '0', new Date());
    message.value = "";
    this.messageList.push(recentChat);
    console.log(recentChat.create_date);
  }
}
