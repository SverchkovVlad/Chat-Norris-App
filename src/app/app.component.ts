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

    

    this.router.navigate(['chat', this.conversation.id], {relativeTo:this.routerActivated});
  }

  messageIncome(incomeInfo: any) {
    this.newMessageFromChuck = incomeInfo;
  }


}
