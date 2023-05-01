import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private themeService: ThemeService) { }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}