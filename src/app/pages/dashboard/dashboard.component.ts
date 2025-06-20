import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

interface Chart {
  id: number;
  name: string;
  type: 'line' | 'bar' | 'pie';
}
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonToggleModule,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
  ],
})
export class DashboardComponent implements OnInit {
  // Sample data for charts
  // Dữ liệu mẫu cho các biểu đồ
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

  ngOnInit() {
    // Initialize the filtered list with all charts
    // Khởi tạo danh sách lọc với tất cả biểu đồ
    this.applyFilter('all');
  }

  // Applies the filter based on the chart type
  // Áp dụng bộ lọc dựa trên loại biểu đồ
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

  // Returns CSS classes for the filter buttons
  // Trả về các lớp CSS cho nút lọc
  getFilterClass(type: string): string {
    const baseClass =
      'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200';
    if (type === this.currentFilter) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    return `${baseClass} bg-gray-700 text-gray-300 hover:bg-gray-600`;
  }

  // Returns CSS classes for the type badge on each card
  // Trả về các lớp CSS cho nhãn loại trên mỗi thẻ
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

  // Returns an SVG icon string based on the chart type
  // Trả về chuỗi SVG icon dựa trên loại biểu đồ
  getIcon(type: 'line' | 'bar' | 'pie'): string {
    const baseClass = `w-6 h-6 text-gray-500`;
    switch (type) {
      case 'line':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>`;
      case 'bar':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                   <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>`;
      case 'pie':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>`;
    }
  }
}
