import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../services/chat.service';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input()
  chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date;

  constructor() { }

  ngOnInit(): void {

    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
    this.userName = this.chatMessage.displayName;
  }

}
