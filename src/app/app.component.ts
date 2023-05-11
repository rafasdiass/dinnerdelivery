import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dinnerdelivery';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.updateBodyClass();
    window.addEventListener('themeUpdated', () => this.updateBodyClass());
  }

  ngOnDestroy(): void {
    window.removeEventListener('themeUpdated', () => this.updateBodyClass());
  }

  updateBodyClass(): void {
    if (this.themeService.isDarkTheme()) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
