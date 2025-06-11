import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PieChartComponent } from "./components/pie-chart/pie-chart.component";

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
    PieChartComponent
],
})
export class DashboardComponent {
  selectedChartType: 'bar' | 'line' | 'pie' = 'bar';

  chartSelection(type: 'bar' | 'line' | 'pie') {
    this.selectedChartType = type;
  }
}
