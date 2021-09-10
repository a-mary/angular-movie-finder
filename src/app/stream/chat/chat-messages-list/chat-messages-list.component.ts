import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ChatMessage, ChatService} from '../services/chat.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.scss']
})
export class ChatMessagesListComponent implements OnInit, AfterViewChecked   {

  // feed: ChatMessage[];

  @ViewChild('chatList') el:ElementRef;
  private firstTime: Boolean = true;

  disableScrollDown = false

  feed: Observable<ChatMessage[]>;
  constructor(private chat: ChatService, private rd: Renderer2) { }

  ngOnInit(): void {
    console.log('feed init');
    // this.chat.getMessages().subscribe(messages => {
    //   console.log(messages);
    //   this.feed = messages;
    //   console.log('length m'+messages.length)
    // })

    this.feed = this.chat.getMessages();
  }

  ngAfterViewChecked(): void {
    // if (!this.firstTime){
    if (this.disableScrollDown) {
      return
    }
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
      // this.firstTime = false;
    // }

  }

  // ngOnChanges() {
  //   this.feed = this.chat.getMessages();
  // }

  onScroll() {
    let element = this.el.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false
    } else {
      this.disableScrollDown = true
    }
  }
}
