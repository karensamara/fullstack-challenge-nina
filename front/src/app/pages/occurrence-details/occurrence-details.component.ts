import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintsService } from '../../services/complaints.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-occurrence-details',
  standalone: true,
  imports: [],
  templateUrl: './occurrence-details.component.html',
  styleUrl: './occurrence-details.component.scss',
})
export class OccurrenceDetailsComponent implements OnInit {
  occurrence$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private complaintsService: ComplaintsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && typeof id === 'string') {
      this.occurrence$ = this.complaintsService.getComplaintById(id);
    } else {
      console.error('ID inválido ou ausente');
      this.occurrence$ = of(null);
    }
  }
}
