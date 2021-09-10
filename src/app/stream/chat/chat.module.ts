import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatMessagesListComponent } from './chat-messages-list/chat-messages-list.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MaterialModule} from '../../material/material.module';
import { ChatComponent } from './chat/chat.component';
import { ChatChannelUsersListComponent } from './chat-channel-users-list/chat-channel-users-list.component';



@NgModule({
  declarations: [ChatFormComponent, ChatMessagesListComponent, ChatMessageComponent, ChatComponent, ChatChannelUsersListComponent],
  exports: [
    ChatFormComponent,
    ChatMessagesListComponent,
    ChatMessageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ChatModule { }
