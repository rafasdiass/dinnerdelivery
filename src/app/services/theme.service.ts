import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'dark' | 'light' = 'dark';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    console.log('Tema atual:', this.theme);
    this.setTheme();
  }

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
    this.updateBodyClass(); // Adicione esta linha
  }

  // Adicione este método
  private updateBodyClass(): void {
    const event = new CustomEvent('themeUpdated');
    window.dispatchEvent(event);
  }
}
