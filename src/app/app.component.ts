import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatApp';

  conversation: any;

  onConversationSelected(conversation : any) {
    this.conversation = conversation;

    let displayChatDiv : HTMLElement | null = document.querySelector('app-chat');

    if (displayChatDiv) {
      displayChatDiv.style.display = "grid";
    }
    
  }


}
