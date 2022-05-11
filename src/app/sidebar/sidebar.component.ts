import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  searchText: string = "";

  conversations = [
    {nickname: 'Alice Freeman', latestMessageRead: false, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
      {id: 5, body: 'Sounds great! So, is our plan of meeting is still in power? Don`t you mind me to invite my GF?', time: '4/22/17, 4:00 AM', me: true},
      {id: 6, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 7, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
      {id: 8, body: 'Sounds great! So, is our plan of meeting is still in power? Don`t you mind me to invite my GF? I am the best wrestler, i am the best talker. I am the best in the world, at what I do! (@ CM PUNK)', time: '4/22/17, 4:00 AM', me: true}
        ]},

    {nickname: 'Josefina', latestMessageRead: false, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'O!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '2/17/17, 4:00 AM', me: true}
        ]},

    {nickname: 'Velazquez', latestMessageRead: true, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/18, 4:00 AM', me: true},
        ]},

    {nickname: 'Johnny Nitro', latestMessageRead: true, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/10, 4:00 AM', me: true},
        ]},

    {nickname: 'Jeff Hardy', latestMessageRead: true,
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/20, 4:00 AM', me: true},
        ]},

    {nickname: 'Alice Freeman', latestMessageRead: false,
    avatar: '/assets/icon/no-user-img-2.png', 
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/15, 4:00 AM', me: true},
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

  ngOnInit(): void {
    this.sortMessagesByTime();
  }

  ngDoCheck() {
    this.sortMessagesByTime();
  }

}
