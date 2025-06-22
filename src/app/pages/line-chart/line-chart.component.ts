import { Component, ElementRef, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import html2canvas from 'html2canvas-pro';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
  ],
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('captureMe', { static: false }) captureMe!: ElementRef;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  get tensionValue() {
    return (this.lineChartOptions!.elements!.line!.tension as number) * 100;
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  exportAsImage() {
    html2canvas(this.captureMe.nativeElement).then((canvas) => {
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = `line_chart_${new Date()
        .toLocaleString('en-GB', { hour12: false })
        .replace(/[/,:\s]/g, '')}.png`;
      link.click();
    });
  }

  tensionChanged = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value);
    const currentData = { ...this.lineChartOptions };
    currentData.elements!.line!.tension = value / 100 || 0;

    this.lineChartOptions = currentData;
  };

  addLabel = () => {
    const currentData = { ...this.lineChartData };
    currentData.labels?.push('');

    currentData.datasets.forEach((dataSet) => {
      dataSet.data.push(0);
    });

    this.lineChartData = currentData;
  };

  addSeries = () => {
    const currentData = { ...this.lineChartData };
    currentData.datasets.push({
      data: new Array(currentData.labels?.length),
      label: '',
      borderColor: 'black',
    });

    this.lineChartData = currentData;
  };

  updateLabel = (labelIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.lineChartData };

    currentData.labels![labelIndex] = value;

    this.lineChartData = currentData;
  };

  updateSeriesLabel = (seriesIndex: number, event: Event) => {
    const value = (event.target as HTMLTextAreaElement).value;
    const currentData = { ...this.lineChartData };

    currentData.datasets[seriesIndex].label = value;

    this.lineChartData = currentData;
  };

  updateSeriesValue = (
    labelIndex: number,
    seriesIndex: number,
    event: Event
  ) => {
    const value = (event.target as HTMLInputElement).value as any;
    const currentData = { ...this.lineChartData };

    currentData.datasets[seriesIndex].data[labelIndex] = value;

    this.lineChartData = currentData;
  };

  updateSeriesColor = (seriesIndex: number, event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const currentData = { ...this.lineChartData };

    currentData.datasets[seriesIndex].borderColor = value;

    this.lineChartData = currentData;
  };

  deleteLabel = (index: number) => {
    const currentData = { ...this.lineChartData };

    currentData.labels?.splice(index, 1);
    currentData.datasets.forEach((dataSet) => {
      dataSet.data.splice(index, 1);
    });

    this.lineChartData = currentData;
  };

  deleteSeries = (index: number) => {
    const currentData = { ...this.lineChartData };
    currentData.datasets.splice(index, 1);

    this.lineChartData = currentData;
  };
}
