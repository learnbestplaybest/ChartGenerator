import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { BarChartComponent } from './components/bar-chart/bar-chart.component';

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
  ],
})
export class DashboardComponent {
  selectedChartType: 'bar' | 'line' | 'pie' = 'bar';

  chartSelection(type: 'bar' | 'line' | 'pie') {
    this.selectedChartType = type;
  }
}
