import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { DoughnutGraphComponent } from '../doughnut-graph/doughnut-graph.component';
import { MonthsLinechartComponent } from '../months-linechart/months-linechart.component';
register();
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, DoughnutGraphComponent, MonthsLinechartComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {}
