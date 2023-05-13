import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme.service'; // Importe o serviço ThemeService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private cartChangedSubscription: Subscription | null;

  public searchTerm: string = '';
  public showSidebar: boolean = false; // Adicionada variável para controlar a exibição da barra lateral
  public logged: boolean = localStorage.getItem('token') ? true : false;

  constructor(
    public cartService: CartService,
    private themeService: ThemeService // Adicione a injeção de dependência do serviço 'ThemeService'
  ) {
    this.cartChangedSubscription = null;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.cartChangedSubscription) {
      this.cartChangedSubscription.unsubscribe();
    }
  }

  logout(): void {
    console.log('aa');
    localStorage.removeItem('token');
    this.closeSidebar();
    window.location.href = '/';
  }

  // Adicionada função para alternar a exibição da barra lateral
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  // Função para fechar a barra lateral
  closeSidebar(): void {
    this.showSidebar = false;
  }

  // Função para alternar o tema
  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Função para verificar se o tema atual é escuro
  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }
}
