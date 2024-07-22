import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-type-barchart',
  standalone: true,
  imports: [],
  templateUrl: './type-barchart.component.html',
  styleUrl: './type-barchart.component.scss',
})
export class TypeBarchartComponent implements AfterViewInit {
  @ViewChild('barChartType') barChartType!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.createChart();
    }
  }

  createChart(): void {
    // const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
    const ctx = this.barChartType.nativeElement.getContext('2d');
    // const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Fotografia não autorizada',
            'Encoxada/apalpada',
            'Intimidação',
            'Pessoa se exibindo',
            'Perseguição',
            'Outros',
          ],
          datasets: [
            {
              label: '',
              data: [50, 60, 70, 80, 40, 30],
              backgroundColor: [
                'rgba(91,67,217,1)',
                'rgba(91,67,217,0.8)',
                'rgba(91,67,217,0.6)',
                'rgba(91,67,217,0.4)',
                'rgba(91,67,217,0.3)',
                'rgba(91,67,217,0)',
              ],
              borderWidth: 0,
              barPercentage: 0.8,
            },
          ],
        },
        options: {
          indexAxis: 'y', // Make the chart horizontal
          maintainAspectRatio: false,

          scales: {
            x: {
              beginAtZero: true,
              max: 80,
              position: 'top', // Move a linha do tempo para cima
              grid: {
                display: false, // Remove a grade (grid)
              },
              ticks: {
                stepSize: 10, // Define o intervalo entre os números do eixo Y
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `Value: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      });
    }
  }
}
