import { Component } from '@angular/core';

@Component({
  selector: 'app-security-page',
  templateUrl: './security-page.component.html',
  styleUrls: ['./security-page.component.scss'],
})
export class SecurityPageComponent {
  selectedTab = 'login';
  registrationSuccessful: undefined | boolean = undefined;
  formSubmitted = false;
  registrationPhrase = {
    success: 'Votre compte a bien été créé',
    failure: 'Une erreur est survenue lors de la création de votre compte',
  };
  errorMessage: string | null = null;

  handleLoginError(message: string) {
    this.errorMessage = message;
  }

  onRegistrationStatus(status: { success: boolean; submitted: boolean }) {
    this.formSubmitted = status.submitted;
    if (status.success) {
      this.selectedTab = 'login';
      this.registrationSuccessful = true;
    } else {
      this.registrationSuccessful = false;
    }
  }

  selectTab(event: Event) {
    this.formSubmitted = false;
    this.registrationSuccessful = undefined;
    this.selectedTab = (event.target as Element).textContent?.toLowerCase() === 'connexion' ? 'login' : 'register';
  }
}
