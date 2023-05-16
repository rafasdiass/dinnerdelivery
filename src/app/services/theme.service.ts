import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'dark' | 'light' = 'dark';

  // Add logoImage variable here
  public logoImage = 'assets/img/DinnerDeliveryWhite.png'; // Caminho da imagem padrão

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    console.log('Tema atual:', this.theme);

    // Update logoImage path based on theme
    if (this.theme === 'dark') {
      this.logoImage = 'assets/img/DinnerDeliveryWhite.png';
    } else {
      this.logoImage = 'assets/img/DinnerDelivery.png';
    }

    this.setTheme();
  }

  // Função adicionada para verificar se o tema atual é escuro
  isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme as 'dark' | 'light';
    }
    this.setTheme();
  }

  private setTheme(): void {
    const themeFile = this.theme === 'dark' ? 'dark-theme.css' : 'light-theme.css';
    const existingTheme = document.getElementById('theme-stylesheet');

    if (existingTheme) {
      existingTheme.setAttribute('href', `assets/css/${themeFile}`);
    } else {
      const linkElement = document.createElement('link');
      linkElement.id = 'theme-stylesheet';
      linkElement.rel = 'stylesheet';
      linkElement.href = `assets/css/${themeFile}`;
      document.head.appendChild(linkElement);
    }

    localStorage.setItem('theme', this.theme);
  }
}
