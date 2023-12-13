import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageBroadcasterService {

  private messageSubject = new Subject<Message>();

  constructor() { }

  sendMessage(message: Message){
    this.messageSubject.next(message);
  }

  recieveMessage(): Observable<Message>{
    return this.messageSubject.asObservable(); 
  }

}
