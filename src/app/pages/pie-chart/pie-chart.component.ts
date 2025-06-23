import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

import { ChartConfiguration, ChartData } from 'chart.js';

import { ChartDetailComponent } from '../../shared/components/chart-detail/chart-detail.component';
import { ChartDataModel, ChartInfo } from '../../shared/models/chart.model';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ChartDetailComponent,
  ],
})
export class PieChartComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _storageService = inject(StorageService);

  chartId: string = '';
  chartDetails: ChartInfo = { creationDate: '' };
  chartOptions: ChartConfiguration<'pie'>['options'] = {};
  chartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

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
      type: 'pie',
      details: this.chartDetails,
      data: this.chartData,
      options: this.chartOptions,
    };
    this._storageService.saveChart(chartToSave);
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  getBackgroundColor(labelIndex: number) {
    return (
      (this.chartData as any)?.datasets[0]?.backgroundColor[labelIndex] ||
      'black'
    );
  }

  donutViewChange = (event: MatCheckboxChange) => {
    const currentData = { ...this.chartOptions } as any;
    currentData.cutout = event.checked ? '50%' : '';

    this.chartOptions = currentData;
    this.saveCurrentChart();
  };

  addLabel = () => {
    const currentData = { ...this.chartData };
    currentData.labels?.push('');
    if (!currentData.datasets.length)
      currentData.datasets.push({ data: [], backgroundColor: [] });

    currentData.datasets.forEach((dataSet: any) => {
      dataSet.data.push(0);
    });

    this.chartData = currentData;

    console.log('chartData', this.chartData);
    this.saveCurrentChart();
  };

  addSeries = () => {
    const currentData = { ...this.chartData };
    currentData.datasets.push({
      data: new Array(currentData.labels?.length),
      label: '',
      borderColor: 'black',
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

  updateSeriesColor = (labelIndex: number, event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const currentData = { ...this.chartData };

    (currentData.datasets[0].backgroundColor as any)[labelIndex] = value;

    this.chartData = currentData;
    this.saveCurrentChart();
  };

  deleteLabel = (index: number) => {
    const currentData = { ...this.chartData };

    currentData.labels?.splice(index, 1);
    currentData.datasets.forEach((dataSet: any) => {
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
