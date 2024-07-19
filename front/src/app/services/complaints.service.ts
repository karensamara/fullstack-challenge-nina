// src/app/services/card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Complaint, ComplaintDto } from '../models/complaint.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  private baseUrl = 'http://localhost:8000/complaints';

  constructor(private http: HttpClient) {}

  getComplaints(): Observable<Complaint[]> {
    return this.http.get<{ complaints: ComplaintDto[] }>(this.baseUrl).pipe(
      map((response) =>
        response.complaints.map((complaint) => ({
          id: complaint.id,
          neighborhood: complaint.neighborhood,
          date: new Date(complaint.date),
          type: complaint.type,
        }))
      )
    );
  }
}
