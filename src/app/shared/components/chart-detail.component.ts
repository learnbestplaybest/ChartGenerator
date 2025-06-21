import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface ChartInfo {
  title: string;
  creationDate: string;
}

export type ChartType = 'line' | 'bar' | 'pie';

@Component({
  selector: 'chart-detail',
  templateUrl: 'chart-detail.component.html',
  styleUrls: ['chart-detail.component.scss'],
  imports: [CommonModule],
})
export class ChartDetailComponent {
  @Input() type: ChartType = 'bar';
  @Input() chartInfo: ChartInfo | null = null;
  @Input() chartData: any;
  @Input() chartOption: any;

  currentLang: 'vn' | 'en' = 'vn';

  translations = {
    vn: {
      goBack: 'Quay lại',
      line: 'Biểu đồ đường',
      bar: 'Biểu đồ cột',
      pie: 'Biểu đồ tròn',
      creationDate: 'Tạo ngày',
      saveImage: 'Lưu ảnh',
      settings: 'Cài đặt',
    },
    en: {
      goBack: 'Go Back',
      line: 'Line Chart',
      bar: 'Bar Chart',
      pie: 'Pie Chart',
      creationDate: 'Created on',
      saveImage: 'Save Image',
      settings: 'Settings',
    },
  };

  t(key: string): string {
    return (this.translations as any)[this.currentLang]?.[key] || key;
  }

  saveImage() {
    alert('Chức năng Lưu ảnh đang được phát triển!');
  }

  // You can add a method to switch language if needed
  setLanguage(lang: 'vn' | 'en') {
    this.currentLang = lang;
  }
}
