import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { RoutePath } from '../../app.routes';
import { ChartDataModel } from '../../shared/models/chart.model';
import { TranslatePipe } from '../../shared/pipes/translate-pipe';
import { StorageService } from '../../shared/services/storage.service';

interface Chart {
  id: number;
  name: string;
  type: 'line' | 'bar' | 'pie';
}
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonToggleModule,
    TranslatePipe,
  ],
})
export class DashboardComponent implements OnInit {
  private _router = inject(Router);
  private _storageService = inject(StorageService);

  allCharts: ChartDataModel[] = [];
  filteredCharts: ChartDataModel[] = [];
  currentFilter: string = 'all';
  isPopoverOpen: boolean = false;

  ngOnInit() {
    this.loadChartsFromStorage();

    this.applyFilter('all');
  }

  loadChartsFromStorage(): void {
    let charts = this._storageService.getCharts();
    this.allCharts = charts;
    this.applyFilter('all');
  }

  createNewChart(type: 'line' | 'bar' | 'pie'): string {
    const chartId = `chart-${Date.now()}`;
    const newChart: ChartDataModel = {
      id: chartId,
      type: type,
      details: {
        creationDate: new Date().toLocaleString(),
      },
      data: {
        labels: [],
        datasets: [],
        backgroundColor: [],
      },
      options: {
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: '',
          },
          elements: {
            line: {
              tension: 0.5,
            },
          },
          datalabels: {
            font: {
              size: 30,
            },
            color: '#fff',
          },
          unitOption: '%',
        },
      },
    };
    this._storageService.saveChart(newChart);

    return chartId;
  }

  deleteChart(chart: ChartDataModel, event: MouseEvent): void {
    event.stopPropagation();
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa biểu đồ "${
          chart.options.plugins?.title?.text || 'no name'
        }" không?`
      )
    ) {
      this._storageService.deleteChart(chart.id);
      this.loadChartsFromStorage(); // Tải lại danh sách để cập nhật UI
    }
  }

  navigateToDetail(chart: ChartDataModel): void {
    const chartId = chart.id;
    switch (chart.type) {
      case 'bar':
        this._router.navigate([RoutePath.BarChart, chartId]);
        break;
      case 'line':
        this._router.navigate([RoutePath.LineChart, chartId]);
        break;
      case 'pie':
        this._router.navigate([RoutePath.PieChart, chartId]);
        break;
    }
  }

  applyFilter(type: string) {
    this.currentFilter = type;
    if (type === 'all') {
      this.filteredCharts = [...this.allCharts];
    } else {
      this.filteredCharts = this.allCharts.filter(
        (chart) => chart.type === type
      );
    }
  }

  togglePopover(): void {
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  closePopover(): void {
    this.isPopoverOpen = false;
  }

  selectChartType(type: 'line' | 'bar' | 'pie'): void {
    const chartId = this.createNewChart(type);
    switch (type) {
      case 'bar':
        this._router.navigate([RoutePath.BarChart, chartId]);
        break;
      case 'line':
        this._router.navigate([RoutePath.LineChart, chartId]);
        break;
      case 'pie':
        this._router.navigate([RoutePath.PieChart, chartId]);
        break;
    }
    this.closePopover();
  }

  getFilterClass(type: string): string {
    const baseClass =
      'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200';
    if (type === this.currentFilter) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    return `${baseClass} bg-gray-700 text-gray-300 hover:bg-gray-600`;
  }

  getBadgeClass(type: 'line' | 'bar' | 'pie'): string {
    const baseClass =
      'text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full';
    switch (type) {
      case 'line':
        return `${baseClass} text-cyan-600 bg-cyan-200`;
      case 'bar':
        return `${baseClass} text-emerald-600 bg-emerald-200`;
      case 'pie':
        return `${baseClass} text-indigo-600 bg-indigo-200`;
    }
  }
}
