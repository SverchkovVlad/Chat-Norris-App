import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  conversations = [
    {nickname: 'Alice Freeman', date: 'Jun 12, 2017', latestMessage: 'You are the worst!', latestMessageRead: true},
    {nickname: 'Josefina', date: 'Feb 18, 2017', latestMessage: 'We are loosing money! Quick!', latestMessageRead: false},
    {nickname: 'Velazquez', date: 'Mar 15, 2017', latestMessage: 'Quickly come to the meeting room 1B, we have a big server issue!', latestMessageRead: true},
    {nickname: 'Johnny Nitro', date: 'Aug 7, 2016', latestMessage: 'Send me some T-shirts, please', latestMessageRead: true},
    {nickname: 'Jeff Hardy', date: 'Oct 9, 2016', latestMessage: 'Charismatic Enigma is ready to grab those championship!', latestMessageRead: true},
    {nickname: 'Alice Freeman', date: 'Jun 12, 2017', latestMessage: 'You are the worst!', latestMessageRead: false},
    {nickname: 'Josefina', date: 'Feb 18, 2017', latestMessage: 'We are loosing money! Quick!', latestMessageRead: true},
    {nickname: 'Velazquez', date: 'Mar 15, 2017', latestMessage: 'Quickly come to the meeting room 1B, we have a big server issue!', latestMessageRead: false},
    {nickname: 'Johnny Nitro', date: 'Aug 7, 2016', latestMessage: 'Send me some T-shirts, please', latestMessageRead: true},
    {nickname: 'Jeff Hardy', date: 'Oct 9, 2016', latestMessage: 'Charismatic Enigma is ready to grab those championship!', latestMessageRead: true}
  ]

  ngOnInit(): void {
  }

}
