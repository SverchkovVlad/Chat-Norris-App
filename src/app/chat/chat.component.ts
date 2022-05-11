import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

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

      let currentDate = new Date();

      this.conversation.messages.push(
        {
          id: 1,
          body: textToSend,
          time: currentDate,
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

      this.conversation.latestMessageRead = true;
    }, 5);

  }

  submitMessage(event: Event) {
    event.preventDefault();
    this.sendMessage();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes) this.scrollToBottom();
  }

}
