import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from './chat.modal';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  messageList: Chat[];
  messageListSubs: Subscription;
  ngOnInit() {
    this.getChatHistory();
  }
  getChatHistory() {
    this.messageListSubs = this.chatService.getChatHistory('3', '4').
    subscribe(res => { this.messageList = res; }, console.error);
  }
}
