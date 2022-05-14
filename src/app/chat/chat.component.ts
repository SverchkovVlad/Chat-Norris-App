import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {

  @Input() conversation: any;

  constructor(private dbOperationsService : DbOperationsService) { }

  getChuckNorrisAnswer() {

      return this.dbOperationsService.getChuckNorrisAnswer().subscribe((answer) => {
        console.log(answer.value);

        //let conv = this.conversation;
  
        let currentDate = new Date();
  
        this.conversation.messages.push(
          {
            id: this.conversation.messages.length + 1,
            body: answer.value,
            time: currentDate,
            me: false
          }
        );

        this.conversation.latestMessageRead = false;
        this.scrollToBottom();
  
      });

  }

  sendMessage(myMessage: boolean) {

    let textArea = document.querySelector('textarea')!;
    let textToSend = textArea?.value;

    if (textToSend) {

      let currentDate = new Date();

      this.conversation.messages.push(
        {
          id: this.conversation.messages.length + 1,
          body: textToSend,
          time: currentDate,
          me: myMessage
        }
      );

      textArea.value = '';
      this.scrollToBottom();
      this.getChuckNorrisAnswer();
      

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
    this.sendMessage(true);
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes) this.scrollToBottom();
  }

}
