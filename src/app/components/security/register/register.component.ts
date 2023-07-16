import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordMatch: boolean = true;
  passwordStrong: boolean = false;
  isEmailValid: boolean = false;
  password: string = "";
  confirmPassword: string = "";
  email: string = "";
  formSubmitted: boolean = false;

  verifyPassword(password: string, confirmPassword: string) {
    this.passwordMatch = password === confirmPassword;
  }

  verifyPasswordStrength(password: string) {
    this.passwordStrong = password.length >= 8;
  }

  submitForm() {
    this.formSubmitted = true;
    console.log("form submitted");
  }

  checkEmail(email: string) {
    if (email.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i)) {
      console.log(email)
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
  }
}
