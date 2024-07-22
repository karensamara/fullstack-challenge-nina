import { Component, Input } from '@angular/core';
import { Complaint } from '../../models/complaint.model';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ocurrences-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ocurrences-card.component.html',
  styleUrls: ['./ocurrences-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OcurrencesCardComponent {
  @Input() ocurrence!: Complaint;
  @Input() backgroundColor: string = '';
}
