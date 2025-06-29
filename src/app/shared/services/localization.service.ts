import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private _storageService = inject(StorageService);
  private translations$ = new BehaviorSubject<any>({});
  language$ = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) {
    const initialLang = this._storageService.getLanguage();
    this.language$ = new BehaviorSubject<string>(initialLang);
    this.loadTranslations('en');
  }

  public setLanguage(lang: string): void {
    this._storageService.saveLanguage(lang);
    this.language$.next(lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string): void {
    if (this.translations$.value[lang]) {
      return;
    }
    this.http
      .get(`assets/locales/locale.${lang}.json`)
      .pipe(
        tap((translations) => {
          const currentTranslations = this.translations$.value;
          this.translations$.next({
            ...currentTranslations,
            [lang]: translations,
          });
          this.language$.next(lang);
        })
      )
      .subscribe();
  }

  public get(key: string): Observable<string> {
    return this.language$.pipe(
      map((lang) => this.translations$.value[lang]),
      map((translations) => translations?.[key] || key)
    );
  }
}
