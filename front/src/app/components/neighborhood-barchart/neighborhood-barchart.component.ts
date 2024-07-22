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
import { ComplaintsService } from '../../services/complaints.service';
import { ComplaintNeighborhoodDto } from '../../models/complaint.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-neighborhood-barchart',
  standalone: true,
  imports: [],
  templateUrl: './neighborhood-barchart.component.html',
  styleUrl: './neighborhood-barchart.component.scss',
})
export class NeighborhoodBarchartComponent implements AfterViewInit {
  @ViewChild('barChartNeighborhoods')
  barChartNeighborhoods!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private complaintsService: ComplaintsService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.complaintsService
        .getComplaintsGroupByNeighborhood()
        .subscribe((data: ComplaintNeighborhoodDto[]) => {
          this.initializeChart(data);
        });
    }
  }

  private initializeChart(data: ComplaintNeighborhoodDto[]): void {
    const ctx = this.barChartNeighborhoods.nativeElement.getContext('2d');
    if (ctx) {
      const getOpacity = (value: number, max: number): number => {
        // Define a opacidade mínima e máxima
        const minOpacity = 0.1;
        const maxOpacity = 1.0;

        // Calcula a opacidade com base no valor
        const opacity = (value / max) * (maxOpacity - minOpacity) + minOpacity;
        return opacity;
      };

      // Encontra o valor máximo para normalização
      const maxValue = Math.max(...data.map((d) => d.count));
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((d) => d.name),
          datasets: [
            {
              label: 'Number of Complaints',
              data: data.map((d) => d.count),
              backgroundColor: data.map((d) => {
                const opacity = getOpacity(d.count, maxValue);
                return `rgba(255, 255, 255, ${opacity})`; // Branco com opacidade variável
              }),
              borderWidth: 0,
              borderRadius: 4,
            },
          ],
        },
        plugins: [ChartDataLabels],

        options: {
          responsive: true,
          layout: {
            padding: {
              // left: 50,
              // right: 50,
              top: 15,
              // bottom: 50,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: false,
              },
              title: {
                display: true,
                text: 'Casos',
                color: 'white',
              },
              grid: {
                display: false,
              },
              border: {
                color: 'white',
              },
            },
            x: {
              ticks: {
                color: 'white',
              },
              title: {
                display: false,
              },
              grid: {
                display: false,
              },
              border: {
                color: 'white',
              },
            },
          },

          plugins: {
            // beforeData
            datalabels: {
              display: true,
              color: 'white',
              anchor: 'end',
              align: 'top',
              formatter: (value: number) => value.toString(),
              font: {
                weight: 'bold',
                size: 12,
              },
              offset: 4, // Ajusta a posição dos rótulos em relação ao topo das barras
            },

            legend: {
              display: false,
              labels: {
                color: 'black',
              },
            },
          },
        },
      });
    } else {
      console.error('Canvas context for barChart not found');
    }
  }
}
