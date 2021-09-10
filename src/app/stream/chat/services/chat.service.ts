import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireList} from '@angular/fire/database';
import {AuthService, User} from '../../../auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

export interface ChatMessage {
  $key?: string;
  email?: string;
  displayName?: string;
  message? : string;
  timeSent?: Date ;
  // movieId: number;
  // posterPath: string;
  //
  // releaseDate: Timestamp;
  // title: string;
  // overview: string;
  // userId: string;
  // voteAvg: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: User;

  chatMessages: Observable<ChatMessage>;
  chatMessage: ChatMessage;
  // displayName: Observable<string>;
  displayName: string;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.auth.user$.subscribe(value => {
      this.user = value ? value :  null;
    })

  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    // console.log('Called sendMessage()!' + msg + this.user.email+ ' ' + this.user.displayName+ ' '+ new Date(this.getTimeStamp()));
    console.log('Called sendMessage()!' + msg + ' ' + this.user.displayName+ ' '+ new Date(this.getTimeStamp()));

    // const chatMessage:ChatMessage = {
    //
    // }
    this.db.collection('messages').doc().set({
      message: msg,
      timeSent:  new Date(),
      // email: this.user.email,
      displayName: this.user.displayName
    });

    console.log('Called sendMessage()!');

  }

  getMessages(): Observable<ChatMessage[]> {
    console.log('getMessages()');
    return this.db.collection('messages', ref =>
      ref.orderBy('timeSent').limitToLast(25))
      .valueChanges();
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return (date + ' ' + time);

  }
}
