import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LineChartComponent } from './pages/line-chart/line-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { Routes } from '@angular/router';

export const RoutePath = {
  Dashboard: '',
  BarChart: 'bar-chart',
  LineChart: 'line-chart',
  PieChart: 'pie-chart',
};

export const routes: Routes = [
  { path: RoutePath.Dashboard, component: DashboardComponent },
  { path: RoutePath.BarChart, component: BarChartComponent },
  { path: RoutePath.LineChart, component: LineChartComponent },
  { path: RoutePath.PieChart, component: PieChartComponent },
];
