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

  conversations = [
    {nickname: 'Alice Freeman', date: 'Jun 12, 2017', latestMessage: 'You are the worst!', latestMessageRead: true, 
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

    {nickname: 'Josefina', date: 'Feb 18, 2017', latestMessage: 'We are loosing money! Quick!', latestMessageRead: false, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'O!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true}
        ]},

    {nickname: 'Velazquez', date: 'Mar 15, 2017', latestMessage: 'Quickly come to the meeting room 1B, we have a big server issue!', latestMessageRead: true, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
        ]},

    {nickname: 'Johnny Nitro', date: 'Aug 7, 2016', latestMessage: 'Send me some T-shirts, please', latestMessageRead: true, 
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
        ]},

    {nickname: 'Jeff Hardy', date: 'Oct 9, 2016', latestMessage: 'Charismatic Enigma is ready to grab those championship!', latestMessageRead: true,
    avatar: '/assets/icon/no-user-img-2.png',  
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
        ]},

    {nickname: 'Alice Freeman', date: 'Jun 12, 2017', latestMessage: 'You are the worst!', latestMessageRead: false,
    avatar: '/assets/icon/no-user-img-2.png', 
    messages: [
      {id: 1, body: 'Oh, hello!', time: '4/22/17, 4:00 AM', me: false},
      {id: 2, body: 'Hi there! How are you?', time: '4/22/17, 4:00 AM', me: true},
      {id: 3, body: 'I am fine, thank you! What about you?', time: '4/22/17, 4:00 AM', me: false},
      {id: 4, body: 'And me too, pal!', time: '4/22/17, 4:00 AM', me: true},
        ]}
  ]

  ngOnInit(): void {
  }

}
