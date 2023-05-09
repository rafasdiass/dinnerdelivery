import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordEmail: string = '';

  onForgotPasswordSubmit(): void {
    console.log('E-mail de recuperação:', this.forgotPasswordEmail);
  }
}