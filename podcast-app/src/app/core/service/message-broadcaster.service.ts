import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageBroadcasterService {

  messageSubject: Subject<any> = new Subject();

  constructor() { }

  sendMessage(message: any){
    this.messageSubject.next(message);
  }

  recieveMessage(): Observable<any>{
    return this.messageSubject.asObservable(); 
  }

}
