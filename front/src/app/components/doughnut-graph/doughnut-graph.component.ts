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
Chart.register(...registerables);
const customTextPlugin = {
  id: 'customTextPlugin',
  beforeDraw: (chart: any) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
      options,
    } = chart;
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

    ctx.fillText(
      options.customText.line1,
      centerX,
      centerY - (lineHeight1 + extraSpacing) / 2
    );

    // Desenhar a segunda linha com estilo de <caption>
    ctx.font = 'normal 1rem Poppins'; // Estilo para <caption>
    const lineHeight2 = 24; // Altura da linha para <caption>
    ctx.fillText(
      options.customText.line2,
      centerX,
      centerY + (lineHeight2 + extraSpacing) / 2
    );

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

  public config1: any = {
    type: 'doughnut',
    data: {
      labels: ['#5B43D9', 'Blue', 'Yellow'],
      datasets: [
        {
          label: '# of Votes',
          data: [12.5, 87.5],
          backgroundColor: ['white', '#C9BEFF'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '80%',
      customText: {
        line1: '12,5%', // Texto para <p>
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

  public config2: any = {
    type: 'doughnut',
    data: {
      labels: ['Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [25, 75],
          backgroundColor: ['white', '#C9BEFF'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '80%',
      customText: {
        line1: '25%', // Texto para <p>
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.initializeCharts();
    }
  }

  initializeCharts(): void {
    const ctx1 = this.doughnutChart1.nativeElement.getContext('2d');
    const ctx2 = this.doughnutChart2.nativeElement.getContext('2d');

    if (ctx1) {
      new Chart(ctx1, this.config1);
    } else {
      console.error('Canvas context for doughnutChart1 not found');
    }

    if (ctx2) {
      new Chart(ctx2, this.config2);
    } else {
      console.error('Canvas context for doughnutChart2 not found');
    }
  }
}
