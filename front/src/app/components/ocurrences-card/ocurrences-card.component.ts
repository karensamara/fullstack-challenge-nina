import { Component, Input } from '@angular/core';
import { Complaint } from '../../models/complaint.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocurrences-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ocurrences-card.component.html',
  styleUrl: './ocurrences-card.component.scss',
})
export class OcurrencesCardComponent {
  @Input() ocurrence: Complaint = {
    id: '',
    type: '',
    date: new Date(),
    neighborhood: '',
  };
}
