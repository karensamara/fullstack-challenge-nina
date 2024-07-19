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
  styleUrl: './ocurrences-list.component.scss',
})
export class OcurrencesListComponent implements OnInit {
  ocurrences: Complaint[] = [];

  constructor(private complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.complaintsService.getComplaints().subscribe(
      (complaints: Complaint[]) => {
        console.log('Fetched complaints:', complaints); // Adicione isto para ver a resposta

        this.ocurrences = complaints;
      },
      (error) => {
        console.error('Error fetching complaints', error);
      }
    );
  }
}
