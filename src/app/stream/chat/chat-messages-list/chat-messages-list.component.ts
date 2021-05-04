import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatMessage, ChatService} from '../services/chat.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.scss']
})
export class ChatMessagesListComponent implements OnInit  {

  // feed: ChatMessage[];

  feed: Observable<ChatMessage[]>;
  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    console.log('feed init');
    // this.chat.getMessages().subscribe(messages => {
    //   console.log(messages);
    //   this.feed = messages;
    //   console.log('length m'+messages.length)
    // })
    this.feed = this.chat.getMessages();
  }

  // ngOnChanges() {
  //   this.feed = this.chat.getMessages();
  // }

}
