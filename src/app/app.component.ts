import { Component, Output } from '@angular/core';
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
  newMessageFromChuck: any;

  onConversationSelected(conversation : any) {

    this.conversation = conversation;

    let displayChatDiv : HTMLElement | null = document.querySelector('app-chat');

    if (displayChatDiv) {
      displayChatDiv.style.display = "grid";
    }

    this.router.navigate(['chat', this.conversation.id], {relativeTo:this.routerActivated});
  }

  messageIncome(incomeInfo: any) {
    this.newMessageFromChuck = incomeInfo;
  }


}
