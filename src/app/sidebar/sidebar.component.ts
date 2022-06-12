import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private http: HttpClient) {

    if (localStorage.getItem('session')) {
      this.conversations = JSON.parse(localStorage.getItem('session') || '{}');
    }
    
   }

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  @Input() newMessageFromChuck: any;
  
  searchText: string = "";

  conversations = [
    {nickname: 'Alice Freeman', latestMessageRead: false, 
    id: 1,
    avatar: '/assets/icon/photos_human/1.jpg',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
      {id: 5, body: 'Sounds great! So, is our plan of meeting is still in power? Don`t you mind me to invite my brother?', time: '4/22/17, 4:00 AM', me: true},
      {id: 6, body: 'Ok) You may take him!', time: '4/22/17, 4:00 AM', me: false},
      {id: 7, body: 'Great! Thnx', time: '4/22/17, 4:00 AM', me: true},
      {id: 8, body: 'Now let`s add here some Lorem ipsum dolor text for best quality content... Now let`s add here some Lorem ipsum dolor text for best quality content...', time: '4/22/17, 4:00 AM', me: true}
        ]},

    {nickname: 'Josefina', latestMessageRead: false, 
    id: 2,
    avatar: '/assets/icon/photos_human/2.jpg',  
    messages: [
      {id: 1, body: 'Ping', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '2/17/17, 4:00 AM', me: true}
        ]},

    {nickname: 'Velazquez', latestMessageRead: true,
    id: 3, 
    avatar: '/assets/icon/photos_human/3.jpg',  
    messages: [
      {id: 1, body: 'Holla, amigo!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'I am going to meet my bro tomorrow. Don`t you mind I take your car?', time: '4/22/18, 4:00 AM', me: true},
        ]},

    {nickname: 'Johnny Nitro', latestMessageRead: true, 
    id: 4,
    avatar: '/assets/icon/photos_human/4.jpg',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'Sounds great! Let me think about our wknds?', time: '4/22/10, 4:00 AM', me: true},
        ]},

    {nickname: 'Ezekiel Jackson', latestMessageRead: true,
    id: 5,
    avatar: '/assets/icon/photos_human/6.jpg',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'Lorem ipsum dolor!', time: '4/22/20, 4:00 AM', me: true},
        ]},

    {nickname: 'Susan Reeds', latestMessageRead: false,
    id: 6,
    avatar: '/assets/icon/photos_human/5.jpg', 
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'Lorem ipsum dolor!', time: '4/22/15, 4:00 AM', me: true},
        ]}
  ];

   filteredConversations() {
    return this.conversations.filter((conversation) => {
      return conversation.nickname.toLowerCase().includes(this.searchText.toLowerCase()) ||
            conversation.messages[conversation.messages.length - 1].body.toLowerCase().includes(this.searchText.toLowerCase());
    })
  }

  sortMessagesByTime() {

    return this.conversations.sort((a, b) => {

      let firstConversation_LastMessageTime = new Date(a.messages[a.messages.length - 1].time);
      let secondConversation_LastMessageTime = new Date (b.messages[b.messages.length - 1].time);

      return +secondConversation_LastMessageTime - (+firstConversation_LastMessageTime);
      
    });

  }

  playAudio_NewMessage(){
    let audio = new Audio();
    audio.src = "/assets/sound/msg.mp3";
    audio.load();
    audio.play();
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

      let chuckMessage = this.newMessageFromChuck.newMessage[0];

      let receiverID = this.conversations.findIndex((receiver) => 
        receiver.id == this.newMessageFromChuck.conversationID
      );

        this.conversations[receiverID].messages.push(chuckMessage);
        this.conversations[receiverID].latestMessageRead = false;

        this.playAudio_NewMessage(); 

    }

  }

}
