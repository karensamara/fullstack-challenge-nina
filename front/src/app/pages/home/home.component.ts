import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DoughnutGraphComponent } from '../../components/doughnut-graph/doughnut-graph.component';
import { OcurrencesListComponent } from '../../components/ocurrences-list/ocurrences-list.component';
import { OcurrencesCardComponent } from '../../components/ocurrences-card/ocurrences-card.component';
import { TypeBarchartComponent } from '../../components/type-barchart/type-barchart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CarouselComponent,
    DoughnutGraphComponent,
    OcurrencesListComponent,
    OcurrencesCardComponent,
    TypeBarchartComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {}
