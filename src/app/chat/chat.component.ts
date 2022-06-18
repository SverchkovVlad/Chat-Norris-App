import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Conversation, IncomingMessage, Message } from '../interfaces/message';
import { DbOperationsService } from '../services/db-operations.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})


export class ChatComponent implements OnInit, OnChanges {

  @Input() conversation: Conversation | undefined;
  @Output() chuckResponse: EventEmitter<IncomingMessage> = new EventEmitter();
  @Output() closeChatWindow_Flag: EventEmitter<boolean> = new EventEmitter();
  mobileVersion: boolean = false;
  
  constructor(
    private dbOperationsService: DbOperationsService,
    private sidebarComponent: SidebarComponent) { }


  getChuckNorrisAnswer(conversationID: number) {

    return this.dbOperationsService.getChuckNorrisAnswer().subscribe((answer) => {

      let currentDate = new Date();

      console.log(currentDate);

      let incomingMessage = 
        {
          messageID: this.sidebarComponent.conversations[conversationID - 1].messages.length + 1,
          text: answer.value,
          time: currentDate,
          me: false
        };

      this.chuckResponse.emit({conversationID, incomingMessage});
      this.scrollToBottom();

    });

  }

  sendMessage() {

    let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    let textToSend = textArea.value;

    if (textToSend) {

      let currentDate = new Date();

      if (this.conversation) {
        this.conversation.messages.push(
          {
            messageID: this.conversation.messages.length + 1,
            text: textToSend,
            time: currentDate,
            me: true
          }
        );
  
      }

      textArea.value = '';
      this.scrollToBottom();

      let id = this.conversation?.conversationID;

      setTimeout(() => {
        if (id) return this.getChuckNorrisAnswer(id)
        else return console.log('error')
      }, 5000);

    }

  }

  scrollToBottom() {

    setTimeout(() => {
      let divBody = document.querySelector(".body") as HTMLElement;
      let divBodyContainer = document.querySelector(".body-container") as HTMLElement;

      divBody.scrollTo(0, divBodyContainer.offsetHeight);

      if (this.conversation) this.conversation.latestMessageRead = true;
    }, 5);

  }

  submitMessage(event: Event) {
    event.preventDefault();
    this.sendMessage();
  }

  returnToSidebar() {
    this.closeChatWindow_Flag.emit(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth <= 768 ? this.mobileVersion = true : this.mobileVersion = false;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

    // I use setTimeout in order to prevent error in console - "div.body doesn`t exist"
    // using other variants was unsuccessful for me(( 
      
    setTimeout( () => {
    if (changes && document.querySelector(".body")) 
      this.scrollToBottom();
    }, 5);

    if (window.innerWidth <= 768)
      this.mobileVersion = true;
    }

  }
