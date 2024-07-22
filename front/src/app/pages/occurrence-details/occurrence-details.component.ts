import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComplaintsService } from '../../services/complaints.service';
import { ComplaintDto } from '../../models/complaint.model';

@Component({
  selector: 'app-occurrence-details',
  standalone: true,
  imports: [],
  templateUrl: './occurrence-details.component.html',
  styleUrl: './occurrence-details.component.scss',
})
export class OccurrenceDetailsComponent implements OnInit {
  occurrence: ComplaintDto | null = null;
  dateAndTimeOccurredAt: { date: string; time: string } = {
    date: '',
    time: '',
  };
  dateAndTimeRegisteredAt: { date: string; time: string } = {
    date: '',
    time: '',
  };
  userAge: number | null = null;

  constructor(
    private occurrenceService: ComplaintsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchOccurrenceById(id);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  fetchOccurrenceById(id: string): void {
    this.occurrenceService.getComplaintById(id).subscribe(
      (data: ComplaintDto) => {
        this.occurrence = data;
        this.dateAndTimeOccurredAt = this.getDateAndTime(
          this.occurrence?.date || ''
        );
        this.dateAndTimeRegisteredAt = this.getDateAndTime(
          this.occurrence?.created_at || ''
        );
        this.userAge = this.calculateAge(this.occurrence?.user_birthdate || '');
      },
      (error) => {
        console.error('Error fetching occurrence', error);
      }
    );
  }

  getDateAndTime(dateTimeString: string | undefined): {
    date: string;
    time: string;
  } {
    if (!dateTimeString) {
      return { date: '', time: '' };
    }
    const date = new Date(dateTimeString);
    const dateString = date.toLocaleDateString('pt-BR');
    const timeString = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return { date: dateString, time: timeString };
  }

  calculateAge(birthDateString: string | undefined): number {
    if (!birthDateString) {
      return -1;
    }
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
