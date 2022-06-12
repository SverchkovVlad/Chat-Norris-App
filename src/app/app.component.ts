import { Component, HostListener, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'chatApp';

  constructor(private router: Router, private routerActivated: ActivatedRoute) { }

  conversation: any;
  conversationClicked: boolean = false;
  newMessageFromChuck: any;

  onConversationSelected(conversation: any) {

    this.conversation = conversation;
    this.conversationClicked = true;
    this.openChat_ForMobile();

    //this.router.navigate(['chat', this.conversation.id], { relativeTo: this.routerActivated });
    
  }

  messageIncome(incomeInfo: any) {
    this.newMessageFromChuck = incomeInfo;
  }

  openChat_ForMobile() {

    if ((window.innerWidth <= 768)) {
      this.hideSidebar();
      this.showChat();
    }

  }

  returnToSidebarCommand() {
    this.hideChat();
    this.showSidebar();    
    this.conversationClicked = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    let chatPlaceholder = document.querySelector('.chat-placeholder') as HTMLDivElement;

    (event.target.innerWidth <= 768) && this.conversationClicked ? 
    this.hideSidebar() : this.showSidebar();
    
    if((event.target.innerWidth > 768) && !chatPlaceholder) {
      this.showChat();
    }

  }

  showChat() {
    let chatWindow = document.querySelector('app-chat') as HTMLDivElement;
    chatWindow.style.display = "block";
  }

  showSidebar() {
    let sidebarWindow = document.querySelector('app-sidebar') as HTMLDivElement;
    sidebarWindow.style.display = "block";
  }

  hideChat() {
    let chatWindow = document.querySelector('app-chat') as HTMLDivElement;
    chatWindow.style.display = "none";
  }

  hideSidebar() {
    let sidebarWindow = document.querySelector('app-sidebar') as HTMLDivElement;
    sidebarWindow.style.display = "none";
  }

}
