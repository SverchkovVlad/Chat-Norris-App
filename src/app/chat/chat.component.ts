import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DbOperationsService } from '../services/db-operations.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { isObservable, Observable } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})


export class ChatComponent implements OnInit, OnChanges {

  @Input() conversation: any;
  @Output() conversationEdited: EventEmitter<any> = new EventEmitter();

  constructor(
    private dbOperationsService: DbOperationsService,
    private sidebarComponent: SidebarComponent) { }
    

  getChuckNorrisAnswer(conversationID: any) {

    return this.dbOperationsService.getChuckNorrisAnswer().subscribe((answer) => {

      let currentDate = new Date().toString();

      let newMessage = [
        {
          id: this.sidebarComponent.conversations[conversationID - 1].messages.length + 1,
          body: answer.value,
          time: currentDate,
          me: false
        }
      ];

      this.conversationEdited.emit( { conversationID, newMessage } );
      this.scrollToBottom();

    });

  }

  sendMessage() {

    let textArea = document.querySelector('textarea')!;
    let textToSend = textArea?.value;

    if (textToSend) {

      let currentDate = new Date();

      this.conversation.messages.push(
        {
          id: this.conversation.messages.length + 1,
          body: textToSend,
          time: currentDate,
          me: true
        }
      );

      textArea.value = '';
      this.scrollToBottom();

      let id = this.conversation.id;

      setTimeout(() => {
        return this.getChuckNorrisAnswer(id);
      }, 5000);

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

    if (changes && document.querySelector(".body")) 
      this.scrollToBottom();

    //console.log(this.router.url.split('?')[0])

    //let id;

    // this.routeActivated.children.forEach(child => {
    //   child.params.subscribe(params => {
    //       const id = +params['id-chat'];
    //       alert(id);
    //   })
    // });

    if (this.conversation)
      console.log(this.conversation.id);

  }

}
