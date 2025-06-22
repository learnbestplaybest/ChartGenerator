import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RoutePath } from '../../app.routes';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate-pipe';

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

  allCharts: Chart[] = [
    { id: 1, name: 'Doanh thu hàng tháng', type: 'bar' },
    { id: 2, name: 'Lượng người dùng mới', type: 'line' },
    { id: 3, name: 'Tỷ lệ hệ điều hành', type: 'pie' },
    { id: 4, name: 'Chi phí quảng cáo', type: 'line' },
    { id: 5, name: 'Sản phẩm bán chạy', type: 'bar' },
    { id: 6, name: 'Mức độ hài lòng của khách hàng', type: 'pie' },
    { id: 7, name: 'Lượt truy cập website', type: 'line' },
    { id: 8, name: 'So sánh doanh số Q1 và Q2', type: 'bar' },
    { id: 9, name: 'Nguồn truy cập', type: 'pie' },
    { id: 10, name: 'Tỷ lệ chuyển đổi', type: 'line' },
    { id: 11, name: 'Số lượng vé đã bán', type: 'bar' },
    { id: 12, name: 'Phân bổ ngân sách', type: 'pie' },
  ];

  filteredCharts: Chart[] = [];
  currentFilter: string = 'all';
  isPopoverOpen: boolean = false;

  ngOnInit() {
    this.applyFilter('all');
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
    switch (type) {
      case 'bar':
        this._router.navigate([RoutePath.BarChart]);
        break;
      case 'line':
        this._router.navigate([RoutePath.LineChart]);
        break;
      case 'pie':
        this._router.navigate([RoutePath.PieChart]);
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
