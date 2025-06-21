import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

type State = {
  currentLang: 'en' | 'vi';
};

const initialState = {
  currentLang: 'en',
} as State;

@Injectable({
  providedIn: 'root', // Singleton trên toàn ứng dụng
})
export class LocalizationService {
  // Dùng BehaviorSubject để lưu trữ và phát ra ngôn ngữ hiện tại
  private language$ = new BehaviorSubject<string>('en');
  // Dùng BehaviorSubject để lưu trữ tất cả các bản dịch đã tải
  private translations$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.loadTranslations('en'); // Tải ngôn ngữ mặc định khi khởi tạo
  }

  // Phương thức để thay đổi ngôn ngữ
  public setLanguage(lang: string): void {
    this.language$.next(lang);
    this.loadTranslations(lang);
  }

  // Tải file dịch
  private loadTranslations(lang: string): void {
    // Nếu đã tải rồi thì không tải lại
    if (this.translations$.value[lang]) {
      return;
    }
    this.http
      .get(`/locales/localize.${lang}.json`)
      .pipe(
        tap((translations) => {
          const currentTranslations = this.translations$.value;
          this.translations$.next({
            ...currentTranslations,
            [lang]: translations,
          });
        })
      )
      .subscribe();
  }

  // Lấy một chuỗi dịch cụ thể, trả về một Observable
  public get(key: string): Observable<string> {
    return this.language$.pipe(
      map((lang) => this.translations$.value[lang]),
      map((translations) => translations?.[key] || key) // Fallback về chính key nếu không tìm thấy
    );
  }
}
