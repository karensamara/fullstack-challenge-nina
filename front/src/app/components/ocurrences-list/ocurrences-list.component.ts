import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule
import { ComplaintsService } from '../../services/complaints.service';
import { Complaint } from '../../models/complaint.model';
import { CommonModule } from '@angular/common';
import { OcurrencesCardComponent } from '../ocurrences-card/ocurrences-card.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-ocurrences-list',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    OcurrencesCardComponent,
    DateFilterComponent,
  ],
  templateUrl: './ocurrences-list.component.html',
  styleUrls: ['./ocurrences-list.component.scss'],
})
export class OcurrencesListComponent implements OnInit {
  ocurrences: Complaint[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  pageLimit = 0;

  constructor(private complaintsService: ComplaintsService) {}

  // ngOnInit(): void {
  //   this.complaintsService.getComplaints().subscribe(
  //     (complaints: Complaint[]) => {
  //       this.ocurrences = complaints;
  //     },
  //     (error) => {
  //       console.error('Error fetching complaints', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.fetchComplaints();
  }
  fetchComplaints(start: Date | null = null, end: Date | null = null): void {
    const validStart = start ?? undefined;
    const validEnd = end ?? undefined;
    this.complaintsService.getComplaints(validStart, validEnd).subscribe(
      (complaints: Complaint[]) => {
        this.ocurrences = complaints;
        this.pageLimit = Math.ceil(this.ocurrences.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Error fetching complaints', error);
      }
    );
  }

  // fetchComplaints(startDate?: Date, endDate?: Date): void {
  //   this.complaintsService.getComplaints(startDate, endDate).subscribe(
  //     (complaints: Complaint[]) => {
  //       this.ocurrences = complaints;
  //       this.pageLimit = Math.ceil(this.ocurrences.length / this.itemsPerPage);
  //     },
  //     (error) => {
  //       console.error('Error fetching complaints', error);
  //     }
  //   );
  // }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onDateRangeSelected(dateRange: {
    start: Date | null;
    end: Date | null;
  }): void {
    this.currentPage = 1;
    this.fetchComplaints(dateRange.start, dateRange.end);
  }

  getCardBackgroundColor(index: number): string {
    return index % 2 === 0 ? '#f8f8f8' : '#E9E8EB';
  }
}
