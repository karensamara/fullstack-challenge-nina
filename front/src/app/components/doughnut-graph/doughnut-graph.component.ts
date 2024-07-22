import {
  Component,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Chart, registerables } from 'chart.js';
import { ComplaintsService } from '../../services/complaints.service';
import { ComplaintAtMomentDto } from '../../models/complaint.model';
Chart.register(...registerables);
const customTextPlugin = {
  id: 'customTextPlugin',
  beforeDraw: (chart: any) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
      options,
    } = chart;

    if (!options.customText) return; // Early exit if customText is undefined

    const centerX = (right - left) / 2 + left;
    const centerY = (bottom - top) / 2 + top;

    ctx.save();

    // Desenhar a primeira linha com estilo de <p>
    ctx.font = 'bold 2.9rem Poppins'; // Estilo para <p>
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white'; // Cor do texto
    const lineHeight1 = 24; // Altura da linha para <p>
    const extraSpacing = 18; // Espaçamento extra para a quebra de linha

    if (options.customText.line1) {
      ctx.fillText(
        options.customText.line1,
        centerX,
        centerY - (lineHeight1 + extraSpacing) / 2
      );
    }

    // Desenhar a segunda linha com estilo de <caption>
    ctx.font = 'normal 1rem Poppins'; // Estilo para <caption>
    const lineHeight2 = 24; // Altura da linha para <caption>
    if (options.customText.line2) {
      ctx.fillText(
        options.customText.line2,
        centerX,
        centerY + (lineHeight2 + extraSpacing) / 2
      );
    }

    ctx.restore();
  },
};

Chart.register(customTextPlugin);

@Component({
  selector: 'app-doughnut-graph',
  standalone: true,
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements AfterViewInit {
  @ViewChild('doughnutChart1') doughnutChart1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart2') doughnutChart2!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private complaintsService: ComplaintsService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.complaintsService
        .getComplaintsGroupByMoment()
        .subscribe((data: ComplaintAtMomentDto) => {
          const truePercentage = (data.True / (data.True + data.False)) * 100;
          const falsePercentage = (data.False / (data.True + data.False)) * 100;
          this.initializeCharts(truePercentage, falsePercentage);
        });
    }
  }

  initializeCharts(truePercentage: number, falsePercentage: number): void {
    const ctx1 = this.doughnutChart1.nativeElement.getContext('2d');
    const ctx2 = this.doughnutChart2.nativeElement.getContext('2d');
    const config1: any = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: '',
            data: [truePercentage, 100 - truePercentage],
            backgroundColor: ['white', '#C9BEFF'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '80%',
        customText: {
          line1: `${truePercentage.toFixed(1)}%`, // Texto para <p>
          line2: 'No momento', // Texto para <caption>
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => '', // Optional: Hide tooltips if not needed
            },
          },
          customTextPlugin,
        },
      },
    };

    const config2: any = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: '',
            data: [falsePercentage, 100 - falsePercentage],
            backgroundColor: ['white', '#C9BEFF'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '80%',
        customText: {
          line1: `${falsePercentage.toFixed(1)}%`, // Texto para <p>
          line2: 'Após o ocorrido', // Texto para <caption>
        },
        plugins: {
          legend: {
            display: false,
          },
          customTextPlugin,
        },
      },
    };
    if (ctx1) {
      new Chart(ctx1, config1);
    } else {
      console.error('Canvas context for doughnutChart1 not found');
    }

    if (ctx2) {
      new Chart(ctx2, config2);
    } else {
      console.error('Canvas context for doughnutChart2 not found');
    }
  }
}
