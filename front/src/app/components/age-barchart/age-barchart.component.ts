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
import { ComplaintAgeDto } from '../../models/complaint.model';

Chart.register(...registerables);
Chart.defaults.color = '#313131';
@Component({
  selector: 'app-age-barchart',
  standalone: true,
  imports: [],
  templateUrl: './age-barchart.component.html',
  styleUrl: './age-barchart.component.scss',
})
export class AgeBarchartComponent implements AfterViewInit {
  @ViewChild('barChartAge') barChartAge!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private complaintsService: ComplaintsService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } else {
      this.complaintsService.getComplaintsGroupByAge().subscribe((data) => {
        this.initializeChart(data);
      });
    }
  }

  initializeChart(data: ComplaintAgeDto) {
    const ctx = this.barChartAge.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Total',
              data: Object.values(data),
              backgroundColor: 'rgba(91,67,217,1)',
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 120,
              ticks: {
                color: 'black', // Cor da fonte dos labels
              },
              title: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'black',
                autoSkip: false,

                maxRotation: 45,
                minRotation: 45,
              },
              title: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    } else {
      console.error('Canvas context for ageBarChart not found');
    }
  }
}
