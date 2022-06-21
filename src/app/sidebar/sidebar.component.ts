import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Conversation, IncomingMessage, Message } from '../interfaces/message';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {
    if (localStorage.getItem('session'))
      this.conversations = JSON.parse(localStorage.getItem('session') || '{}');
  }

  @Output() conversationClicked: EventEmitter<Conversation> = new EventEmitter(); 
  @Input() newMessageFromChuck: IncomingMessage | undefined;

  searchText: string = "";

  conversations = [
    {
      nickname: 'Alice Freeman', latestMessageRead: false,
      conversationID: 1,
      avatar: '/assets/icon/photos_human/1.jpg',
      messages: [
        { messageID: 1, text: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 2, text: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 3, text: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 4, text: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 5, text: 'Sounds great! So, is our plan of meeting is still in power? Don`t you mind me to invite my brother?', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 6, text: 'Ok) You may take him!', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 7, text: 'Great! Thnx', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 8, text: 'Now let`s add here some Lorem ipsum dolor text for best quality content... Now let`s add here some Lorem ipsum dolor text for best quality content...', time: '4/22/17, 4:00 AM', me: true }
      ]
    },

    {
      nickname: 'Josefina', latestMessageRead: false,
      conversationID: 2,
      avatar: '/assets/icon/photos_human/2.jpg',
      messages: [
        { messageID: 1, text: 'Ping', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 2, text: 'Hi there! How are you?', time: '2/17/17, 4:00 AM', me: true }
      ]
    },

    {
      nickname: 'Velazquez', latestMessageRead: true,
      conversationID: 3,
      avatar: '/assets/icon/photos_human/3.jpg',
      messages: [
        { messageID: 1, text: 'Holla, amigo!', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 2, text: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 3, text: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 4, text: 'I am going to meet my bro tomorrow. Don`t you mind I take your car?', time: '4/22/18, 4:00 AM', me: true },
      ]
    },

    {
      nickname: 'Johnny Nitro', latestMessageRead: true,
      conversationID: 4,
      avatar: '/assets/icon/photos_human/4.jpg',
      messages: [
        { messageID: 1, text: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 2, text: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 3, text: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 4, text: 'Sounds great! Let me think about our wknds?', time: '4/22/10, 4:00 AM', me: true },
      ]
    },

    {
      nickname: 'Ezekiel Jackson', latestMessageRead: true,
      conversationID: 5,
      avatar: '/assets/icon/photos_human/6.jpg',
      messages: [
        { messageID: 1, text: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 2, text: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 3, text: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 4, text: 'Lorem ipsum dolor!', time: '4/22/20, 4:00 AM', me: true },
      ]
    },

    {
      nickname: 'Susan Reeds', latestMessageRead: false,
      conversationID: 6,
      avatar: '/assets/icon/photos_human/5.jpg',
      messages: [
        { messageID: 1, text: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 2, text: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true },
        { messageID: 3, text: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false },
        { messageID: 4, text: 'Lorem ipsum dolor!', time: '4/22/15, 4:00 AM', me: true },
      ]
    }
  ];

  filteredConversations() {

    const checkNickname = (conversation: Conversation) => {
      return conversation.nickname.toLowerCase().includes(this.searchText.toLowerCase())
    }

    const checkMessage = (conversation: Conversation) => {

      let hasSubstring : boolean = false;

      for(let message of conversation.messages) {
        if(message.text.toLowerCase().includes(this.searchText.toLowerCase())) {
          hasSubstring = true;
          break;
        }
      }
      return hasSubstring;
    }

    return this.conversations.filter((conversation) => {
      return checkMessage(conversation) || checkNickname(conversation)
    });
      
  }

  sortMessagesByTime() {

    return this.conversations.sort((a, b) => {

      let firstConversation_LastMessageTime = new Date(a.messages[a.messages.length - 1].time);
      let secondConversation_LastMessageTime = new Date(b.messages[b.messages.length - 1].time);

      return +secondConversation_LastMessageTime - (+firstConversation_LastMessageTime);

    });

  }

  playAudio_NewMessage() {
    let audio = new Audio();
    audio.src = "/assets/sound/msg.mp3";
    audio.load();
    audio.play();
  }

  acceptAndDisplayIncomeMessage(newMessageFromChuck: IncomingMessage) {

    let incomeMessage =
      {
        messageID: newMessageFromChuck.incomingMessage.messageID,
        text: newMessageFromChuck.incomingMessage.text,
        time: (newMessageFromChuck.incomingMessage.time).toString(),
        me: false
      };

      let receiverID = this.conversations.findIndex((receiver) =>
        receiver.conversationID == newMessageFromChuck.conversationID
      );

      this.conversations[receiverID].messages.push(incomeMessage);
      this.conversations[receiverID].latestMessageRead = false;
  }

  ngOnInit(): void {
    this.sortMessagesByTime();
  }

  ngDoCheck() {
    this.sortMessagesByTime();
    localStorage.setItem('session', JSON.stringify(this.conversations));
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes && this.newMessageFromChuck) {

      this.acceptAndDisplayIncomeMessage(this.newMessageFromChuck);
      this.playAudio_NewMessage();

    }

  }

}
