import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  handleSubmit(event: KeyboardEvent) {

    // if (event.keyCode == 13)
  }

  send(e) {

    e.preventDefault();
    if (this.message!=='')
    this.chat.sendMessage(this.message);
    this.message = '';
  }
}
