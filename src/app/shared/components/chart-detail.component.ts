import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../pipes/translate-pipe';
import html2canvas from 'html2canvas-pro';

export interface ChartInfo {
  title: string;
  creationDate: string;
}

export type ChartType = 'line' | 'bar' | 'pie';

@Component({
  selector: 'chart-detail',
  templateUrl: 'chart-detail.component.html',
  styleUrls: ['chart-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslatePipe, BaseChartDirective],
})
export class ChartDetailComponent {
  @ViewChild('captureMe', { static: false }) captureMe!: ElementRef;

  @Input() type: ChartType = 'bar';
  @Input() chartInfo: ChartInfo | null = null;
  @Input() chartData: any;
  @Input() chartOption: any;

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
