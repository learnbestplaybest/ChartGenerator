import { Injectable } from '@angular/core';

import { ChartDataModel } from '../models/chart.model';

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

  getCharts(): ChartDataModel[] {
    const data = localStorage.getItem(this.CHARTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveCharts(charts: ChartDataModel[]): void {
    localStorage.setItem(this.CHARTS_KEY, JSON.stringify(charts));
  }

  getChartById(id: string): ChartDataModel | undefined {
    const charts = this.getCharts();
    return charts.find((c) => c.id === id);
  }

  saveChart(chartToSave: ChartDataModel): void {
    const charts = this.getCharts();
    const chartIndex = charts.findIndex((c) => c.id === chartToSave.id);
    if (chartIndex > -1) {
      charts[chartIndex] = chartToSave;
    } else {
      charts.push(chartToSave);
    }
    this.saveCharts(charts);
  }

  deleteChart(id: string): void {
    let charts = this.getCharts();
    charts = charts.filter((c) => c.id !== id);
    this.saveCharts(charts);
  }
}
