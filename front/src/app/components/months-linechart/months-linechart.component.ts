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
import {
  ComplaintGendersDto,
  ComplaintMonthsDto,
} from '../../models/complaint.model';

Chart.register(...registerables);
Chart.defaults.color = '#313131';

@Component({
  selector: 'app-months-linechart',
  standalone: true,
  imports: [],
  templateUrl: './months-linechart.component.html',
  styleUrl: './months-linechart.component.scss',
})
export class MonthsLinechartComponent implements AfterViewInit {
  @ViewChild('lineChartMonths') lineChartMonths!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private complaintsService: ComplaintsService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.complaintsService
        .getComplaintsGroupByMonths()
        .subscribe((data: ComplaintMonthsDto) => {
          this.initializeChart(data);
        });
    }
  }

  initializeChart(data: ComplaintMonthsDto): void {
    const ctx = this.lineChartMonths.nativeElement.getContext('2d');

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Ocorrências no mês',
              data: Object.values(data),
              backgroundColor: gradient,
              borderColor: 'white',
              borderWidth: 1,
              fill: true,
              tension: 0.1,
              pointBackgroundColor: 'rgba(255, 255, 255, 1)', // White circles for points
              pointRadius: 3, // Size of the points
              pointHoverRadius: 5, // Size of the points on hover
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              grid: {
                display: false,
              },
              beginAtZero: true,
              ticks: {
                color: 'white', // Font color for labels
              },
              title: {
                display: false,
              },
              border: {
                color: 'white',
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'white', // Font color for labels
              },
              title: {
                display: false,
              },
              border: {
                color: 'white',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: 'white', // Font color for legend labels
              },
            },
          },
        },
      });
    }
  }
}
