import { Injectable } from '@angular/core';

interface Chart {
  id: number;
  name: string;
  type: 'line' | 'bar' | 'pie';
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly LANGUAGE_KEY = 'app_language';
  private readonly CHARTS_KEY = 'app_charts';

  saveLanguage(lang: string): void {
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  getLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'vn';
  }

  saveCharts(charts: Chart[]): void {
    try {
      localStorage.setItem(this.CHARTS_KEY, JSON.stringify(charts));
    } catch (e) {
      console.error('Lỗi khi lưu biểu đồ vào localStorage:', e);
    }
  }

  getCharts(): Chart[] {
    try {
      const chartsJson = localStorage.getItem(this.CHARTS_KEY);
      return chartsJson ? JSON.parse(chartsJson) : [];
    } catch (e) {
      console.error('Lỗi khi lấy biểu đồ từ localStorage:', e);
      return [];
    }
  }
}
