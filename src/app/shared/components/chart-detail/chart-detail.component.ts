import { ChartInfo, ChartType } from '../../models/chart.model';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { TranslatePipe } from '../../pipes/translate-pipe';
import html2canvas from 'html2canvas-pro';

@Component({
  selector: 'chart-detail',
  templateUrl: 'chart-detail.component.html',
  styleUrls: ['chart-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslatePipe, BaseChartDirective, FormsModule],
})
export class ChartDetailComponent {
  private _storageService = inject(StorageService);
  chartPlugins: any = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('captureMe', { static: false }) captureMe!: ElementRef;

  @Input() type: ChartType = 'bar';
  @Input() chartInfo: ChartInfo = {
    creationDate: Date.now.toString(),
  };
  @Input() chartData: any;

  private _chartOption: any;
  @Input()
  get chartOption(): any {
    return this._chartOption;
  }
  @Output() chartOptionChange = new EventEmitter<any>();
  set chartOption(value: any) {
    this._chartOption = value;
    this.chartOptionChange.emit(this._chartOption);
  }

  @Input() chartId!: string;

  private _showLabel: boolean = false;
  @Input()
  get showLabel(): boolean {
    return this._showLabel;
  }

  set showLabel(value: boolean) {
    this._showLabel = value;
    if (value) {
      this.chartPlugins.push(DatalabelsPlugin);
      this.chart?.render();
    } else {
      this.chartPlugins = [];
      setTimeout(() => {
        this.chart?.render();
      }, 200);
    }
  }

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
      link.download = `${this.type}_chart_${new Date()
        .toLocaleString('en-GB', { hour12: false })
        .replace(/[/,:\s]/g, '')}.png`;
      link.click();
    });
  }
}
