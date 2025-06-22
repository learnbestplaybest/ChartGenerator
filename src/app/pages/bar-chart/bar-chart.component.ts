import { ChartConfiguration, ChartData } from 'chart.js';
import {
  ChartDetailComponent,
  ChartInfo,
  ChartType,
} from '../../shared/components/chart-detail.component';
import { Component, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ChartDetailComponent,
  ],
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  chartType: ChartType = 'bar';

  chartDetails: ChartInfo = {
    title: 'Doanh thu hàng tháng',
    creationDate: '21 tháng 6, 2025',
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  trackByFn(index: number, item: any) {
    return index;
  }

  addLabel = () => {
    const currentData = { ...this.barChartData };
    currentData.labels?.push('');

    currentData.datasets.forEach((dataSet) => {
      dataSet.data.push(0);
    });

    this.barChartData = currentData;
  };

  addSeries = () => {
    const currentData = { ...this.barChartData };
    currentData.datasets.push({
      data: new Array(currentData.labels?.length),
      label: '',
      backgroundColor: 'black',
    });

    this.barChartData = currentData;
  };

  updateLabel = (labelIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.barChartData };

    currentData.labels![labelIndex] = value;

    this.barChartData = currentData;
  };

  updateSeriesLabel = (seriesIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.barChartData };

    currentData.datasets[seriesIndex].label = value;

    this.barChartData = currentData;
  };

  updateSeriesValue = (
    labelIndex: number,
    seriesIndex: number,
    event: Event
  ) => {
    const value = (event.target as HTMLInputElement).value as any;
    const currentData = { ...this.barChartData };

    currentData.datasets[seriesIndex].data[labelIndex] = value;

    this.barChartData = currentData;
  };

  updateSeriesColor = (seriesIndex: number, event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const currentData = { ...this.barChartData };

    currentData.datasets[seriesIndex].backgroundColor = value;

    this.barChartData = currentData;
  };

  deleteLabel = (index: number) => {
    const currentData = { ...this.barChartData };

    currentData.labels?.splice(index, 1);
    currentData.datasets.forEach((dataSet) => {
      dataSet.data.splice(index, 1);
    });

    this.barChartData = currentData;
  };

  deleteSeries = (index: number) => {
    const currentData = { ...this.barChartData };
    currentData.datasets.splice(index, 1);

    this.barChartData = currentData;
  };
}
