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


  getChuckNorrisAnswer(specificConversation: Conversation) {

    return this.dbOperationsService.getChuckNorrisAnswer().subscribe((answer) => {

      let currentDate = new Date();

      let incomingMessage = 
        {
          messageID: specificConversation.messages.length + 1,
          text: answer.value,
          time: currentDate,
          me: false
        };

        let conversationID : number = specificConversation.conversationID;


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

      let specificConversation = this.conversation;

      setTimeout(() => {
        //if (specificConversation) return this.getChuckNorrisAnswer(specificConversation)
        //else return console.log('error')

        specificConversation ? this.getChuckNorrisAnswer(specificConversation) : console.log('error while getting Chuck`s answer')

      }, 5000);

    }

  }

  scrollToBottom() {

    setTimeout(() => {
      let divBody = document.querySelector(".body") as HTMLElement;
      let divBodyContent = document.querySelector(".body-content") as HTMLElement;

      divBody.scrollTo(0, divBodyContent.offsetHeight);

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

    // I used setTimeout in order to prevent error in console - "div.body doesn`t exist"
    // using other variants was unsuccessful for me(( 
      
    setTimeout( () => {
    if (changes && document.querySelector(".body")) 
      this.scrollToBottom();
    }, 5);

    if (window.innerWidth <= 768)
      this.mobileVersion = true;
    }

  }
