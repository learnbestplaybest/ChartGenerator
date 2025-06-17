import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

import { ChartConfiguration } from 'chart.js';
import html2canvas from 'html2canvas';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('captureMe', { static: false }) captureMe!: ElementRef;

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: function (value: any, context: any) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  } as any;

  public pieChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  trackByFn(index: number, item: any) {
    return index;
  }

  exportAsImage() {
    html2canvas(this.captureMe.nativeElement).then((canvas) => {
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = `bar_chart_${new Date()
        .toLocaleString('en-GB', { hour12: false })
        .replace(/[/,:\s]/g, '')}.png`;
      link.click();
    });
  }

  donutViewChange = (event: MatCheckboxChange) => {
    const currentData = { ...this.pieChartOptions } as any;
    currentData.cutout = event.checked ? '50%' : '';

    this.pieChartOptions = currentData;
  };

  addLabel = () => {
    const currentData = { ...this.pieChartData };
    currentData.labels?.push('');

    currentData.datasets.forEach((dataSet: any) => {
      dataSet.data.push(0);
    });

    this.pieChartData = currentData;
  };

  addSeries = () => {
    const currentData = { ...this.pieChartData };
    currentData.datasets.push({
      data: new Array(currentData.labels?.length),
      label: '',
      borderColor: 'black',
    });

    this.pieChartData = currentData;
  };

  updateLabel = (labelIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.pieChartData };

    currentData.labels![labelIndex] = value;

    this.pieChartData = currentData;
  };

  updateSeriesValue = (
    labelIndex: number,
    seriesIndex: number,
    event: Event
  ) => {
    const value = (event.target as HTMLInputElement).value as any;
    const currentData = { ...this.pieChartData };

    currentData.datasets[seriesIndex].data[labelIndex] = value;

    this.pieChartData = currentData;
  };

  updateSeriesColor = (labelIndex: number, event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const currentData = { ...this.pieChartData };

    (currentData.datasets[0].backgroundColor as any)[labelIndex] = value;

    this.pieChartData = currentData;
  };

  deleteLabel = (index: number) => {
    const currentData = { ...this.pieChartData };

    currentData.labels?.splice(index, 1);
    currentData.datasets.forEach((dataSet: any) => {
      dataSet.data.splice(index, 1);
    });

    this.pieChartData = currentData;
  };

  deleteSeries = (index: number) => {
    const currentData = { ...this.pieChartData };
    currentData.datasets.splice(index, 1);

    this.pieChartData = currentData;
  };
}
