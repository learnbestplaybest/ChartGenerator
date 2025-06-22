import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

import { ChartConfiguration, ChartData } from 'chart.js';

import { ChartDetailComponent } from '../../shared/components/chart-detail/chart-detail.component';
import { ChartDataModel, ChartInfo } from '../../shared/models/chart.model';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ChartDetailComponent,
  ],
})
export class BarChartComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _storageService = inject(StorageService);

  chartId: string = '';
  chartDetails: ChartInfo = { creationDate: '' };
  chartOptions: ChartConfiguration<'bar'>['options'] = {};
  chartData: ChartData = { labels: [], datasets: [] };

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.chartId = id;
      const loadedChart = this._storageService.getChartById(id);

      if (loadedChart) {
        this.chartDetails = loadedChart.details;
        this.chartData = loadedChart.data;
        this.chartOptions = loadedChart.options;
      } else {
        this.initializeNewChart();
        this.saveCurrentChart();
      }
    });
  }

  private initializeNewChart(): void {
    this.chartDetails = {
      creationDate: new Date().toLocaleString(),
    };
    this.chartOptions = {
      plugins: {
        legend: { display: true },
        title: { display: true, text: '' },
      },
    };
    this.chartData = {
      labels: [],
      datasets: [],
    };
  }

  saveCurrentChart(): void {
    if (!this.chartId) return;

    const chartToSave: ChartDataModel = {
      id: this.chartId,
      type: 'bar',
      details: this.chartDetails,
      data: this.chartData,
      options: this.chartOptions,
    };
    this._storageService.saveChart(chartToSave);
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  addLabel = () => {
    const currentData = { ...this.chartData };
    currentData.labels?.push('');

    currentData.datasets.forEach((dataSet) => {
      dataSet.data.push(0);
    });

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  addSeries = () => {
    const currentData = { ...this.chartData };
    currentData.datasets.push({
      data: new Array(currentData.labels?.length),
      label: '',
      backgroundColor: 'black',
    });

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  updateLabel = (labelIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.chartData };

    currentData.labels![labelIndex] = value;

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  updateSeriesLabel = (seriesIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.chartData };

    currentData.datasets[seriesIndex].label = value;

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  updateSeriesValue = (
    labelIndex: number,
    seriesIndex: number,
    event: Event
  ) => {
    const value = (event.target as HTMLInputElement).value as any;
    const currentData = { ...this.chartData };

    currentData.datasets[seriesIndex].data[labelIndex] = value;

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  updateSeriesColor = (seriesIndex: number, event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const currentData = { ...this.chartData };

    currentData.datasets[seriesIndex].backgroundColor = value;

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  deleteLabel = (index: number) => {
    const currentData = { ...this.chartData };

    currentData.labels?.splice(index, 1);
    currentData.datasets.forEach((dataSet) => {
      dataSet.data.splice(index, 1);
    });

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  deleteSeries = (index: number) => {
    const currentData = { ...this.chartData };
    currentData.datasets.splice(index, 1);

    this.chartData = currentData;
    this.saveCurrentChart();
  };
}
