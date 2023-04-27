import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private socialAuthService: SocialAuthService) {}

  loginEmail: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerName: string = '';
  registerAddress: string = '';
  registerPassword2: string = '';
  isLoginView: boolean = true;

  onLoginSubmit(): void {
    this.authService.login({ email: this.loginEmail, password: this.loginPassword }).subscribe(
      (response) => {
        console.log('Login bem-sucedido:', response);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
      (error) => {
        console.error('Ocorreu um erro ao fazer login:', error);
      }
    );
  }

  onRegisterSubmit(): void {
    this.authService.register({
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword2,
      address: this.registerAddress,
    }).subscribe(
      (response) => {
        console.log('Registro bem-sucedido:', response);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      },
      (error) => {
        console.error('Ocorreu um erro ao fazer o registro:', error);
      }
    );
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      console.log('Usuário do Google:', user);
      // Implemente o processo de autenticação com seu back-end aqui
    });
  }

  onPassword2Blur(): void {
    if (this.registerPassword !== this.registerPassword2) {
      alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
    }
  }

  async toggleView(): Promise<void> {
    const flip = document.querySelector('.flip');
    if (this.isLoginView) {
      flip?.classList.add('rotate');
    } else {
      flip?.classList.add('rotate-back');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isLoginView = !this.isLoginView;
    flip?.classList.remove('rotate', 'rotate-back');
  }

  onFlip(): void {
    const flip = document.querySelector('.flip');
    flip?.classList.add('rotate');
    setTimeout(() => {
      flip?.classList.remove('rotate');
    }, 500);
  }
}
