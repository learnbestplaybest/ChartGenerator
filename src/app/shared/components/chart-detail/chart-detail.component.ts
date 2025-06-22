import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import html2canvas from 'html2canvas-pro';
import { BaseChartDirective } from 'ng2-charts';

import { ChartInfo, ChartType } from '../../models/chart.model';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'chart-detail',
  templateUrl: 'chart-detail.component.html',
  styleUrls: ['chart-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslatePipe, BaseChartDirective, FormsModule],
})
export class ChartDetailComponent {
  private _storageService = inject(StorageService);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('captureMe', { static: false }) captureMe!: ElementRef;

  @Input() type: ChartType = 'bar';
  @Input() chartInfo: ChartInfo = {
    creationDate: Date.now.toString(),
  };
  @Input() chartData: any;
  @Input() chartOption: any;
  @Input() chartId!: string;

  updateChartTitle = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.chartOption.plugins.title.display = true;
    this.chartOption.plugins.title.text = value;

    const loadedChart = this._storageService.getChartById(this.chartId);

    if (loadedChart) {
      loadedChart.options = this.chartOption;
      this._storageService.saveChart(loadedChart);
    }

    this.chart?.render();
  };

  saveImage() {
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
}
