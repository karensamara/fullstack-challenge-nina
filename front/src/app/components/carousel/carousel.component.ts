import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SwiperModule } from 'swiper/types';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { DoughnutGraphComponent } from '../doughnut-graph/doughnut-graph.component';
// register Swiper custom elements
register();
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, DoughnutGraphComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {}
