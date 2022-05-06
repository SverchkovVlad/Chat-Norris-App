import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
//import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {

  @Input() conversation: any;

  constructor() { }

  sendMessage() {

    let textArea = document.querySelector('textarea')!;
    let textToSend = textArea?.value;


    if (textToSend) {
      this.conversation.messages.push(
        {
          id: 1,
          body: textToSend,
          time: '4/22/17, 4:00 AM',
          me: true
        }
      );

      textArea.value = '';

      this.scrollToBottom();
     
    }

  }

  scrollToBottom() {

    setTimeout(() => {
      let divBody = document.querySelector(".body")! as HTMLElement;
      let divBodyContainer = document.querySelector(".body-container")! as HTMLElement;
      
      divBody.scrollTo(0, divBodyContainer.offsetHeight);
    }, 5);

  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes) this.scrollToBottom();
  }

}
