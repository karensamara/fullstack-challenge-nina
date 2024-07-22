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
import { ComplaintTypesDto } from '../../models/complaint.model';
Chart.register(...registerables);
Chart.defaults.color = '#313131';

@Component({
  selector: 'app-type-barchart',
  standalone: true,
  imports: [],
  templateUrl: './type-barchart.component.html',
  styleUrl: './type-barchart.component.scss',
})
export class TypeBarchartComponent implements AfterViewInit {
  @ViewChild('barChartType') barChartType!: ElementRef<HTMLCanvasElement>;

  private desiredLabels: (keyof ComplaintTypesDto)[] = [
    'UNWANTED_PHOTOS',
    'GROPING',
    'THREATENING',
    'FLASHING',
    'STALKING',
    'UNWANTED_COMMENTS',
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private complaintsService: ComplaintsService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.complaintsService
        .getComplaintsGroupByTypes()
        .subscribe((data: ComplaintTypesDto) => {
          const orderedData = this.desiredLabels.map(
            (label) => data[label] || 0
          );

          this.initializeChart(orderedData);
        });
    }
  }

  initializeChart(data: number[]): void {
    const ctx = this.barChartType.nativeElement.getContext('2d');
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
              data: Object.values(data),
              backgroundColor: [
                'rgba(91,67,217,1)',
                'rgba(91,67,217,0.8)',
                'rgba(91,67,217,0.6)',
                'rgba(91,67,217,0.4)',
                'rgba(91,67,217,0.3)',
                'rgba(182,181,187,1)',
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
                stepSize: 10,
              },
            },
            y: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
              ticks: {
                align: 'start', // Tentar alterar o alinhamento para as labels do eixo X
                padding: 5, // Ajuste o padding para ajudar no alinhamento
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
