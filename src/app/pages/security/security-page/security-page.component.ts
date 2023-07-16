import { Component } from '@angular/core';

@Component({
  selector: 'app-security-page',
  templateUrl: './security-page.component.html',
  styleUrls: ['./security-page.component.scss']
})
export class SecurityPageComponent {
  selectedTab: string = "login";
  
  selectTab(event: Event) {
    this.selectedTab = (event.target as Element).textContent?.toLowerCase() === 'connexion' ? 'login' : 'register';
  }
}
