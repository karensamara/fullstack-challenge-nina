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
import { ComplaintGendersDto } from '../../models/complaint.model';

Chart.register(...registerables);
Chart.defaults.color = '#313131';

@Component({
  selector: 'app-gender-barchart',
  standalone: true,
  imports: [],
  templateUrl: './gender-barchart.component.html',
  styleUrl: './gender-barchart.component.scss',
})
export class GenderBarchartComponent implements AfterViewInit {
  @ViewChild('barChartGender') barChartGender!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private complaintsService: ComplaintsService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.complaintsService
        .getComplaintsGroupByGender()
        .subscribe((data: ComplaintGendersDto) => {
          this.initializeChart(data);
        });
    }
  }

  initializeChart(data: ComplaintGendersDto): void {
    const ctx = this.barChartGender.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mulheres', 'Homens', 'Não-binários'],
          datasets: [
            {
              label: 'Cisgênero',
              data: [data.CIS_FEMALE, data.CIS_MALE, null],
              backgroundColor: 'rgba(91,67,217,1)',
              borderWidth: 0,
              stack: 'stack1',
            },
            {
              label: 'Transgênero',
              data: [data.TRANS_FEMALE, data.TRANS_MALE, null],
              backgroundColor: 'rgba(151,134,242,1)',
              borderWidth: 0,
              stack: 'stack2',
            },
            {
              label: '',
              data: [null, null, data.OTHER],
              backgroundColor: 'rgba(151,134,242,1)',
              borderWidth: 0,
              stack: 'stack3',
              barThickness: 50,
            },
          ],
        },
        options: {
          skipNull: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
              stacked: true,
              ticks: {
                autoSkip: false,
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
              max: 80,
              ticks: {
                stepSize: 20,
              },
            },
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                boxWidth: 6,
                pointStyle: 'rectRounded',
                filter: (legendItem) => {
                  // Filtrar itens com label vazia
                  return legendItem.text !== '';
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      });
    }
  }
}
