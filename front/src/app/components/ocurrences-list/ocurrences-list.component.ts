import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsService } from '../../services/complaints.service';
import { Complaint } from '../../models/complaint.model';
import { OcurrencesCardComponent } from '../ocurrences-card/ocurrences-card.component';

@Component({
  selector: 'app-ocurrences-list',
  standalone: true,
  imports: [CommonModule, OcurrencesCardComponent],
  templateUrl: './ocurrences-list.component.html',
  styleUrls: ['./ocurrences-list.component.scss'],
})
export class OcurrencesListComponent implements OnInit {
  ocurrences: Complaint[] = [];

  constructor(private complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.complaintsService.getComplaints().subscribe(
      (complaints: Complaint[]) => {
        this.ocurrences = complaints;
      },
      (error) => {
        console.error('Error fetching complaints', error);
      }
    );
  }

  getCardBackgroundColor(index: number): string {
    return index % 2 === 0 ? '#f8f8f8' : '#E9E8EB';
  }
}
