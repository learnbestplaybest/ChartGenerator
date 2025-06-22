import { Component, ViewEncapsulation, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LocalizationService } from './shared/services/localization.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  private localizationService = inject(LocalizationService);

  currentLang$ = this.localizationService.language$;

  setLanguage(lang: 'vn' | 'en') {
    this.localizationService.setLanguage(lang);
  }
}
