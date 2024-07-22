// src/app/services/card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Complaint,
  ComplaintAtMomentDto,
  ComplaintDto,
  ComplaintTypesDto,
} from '../models/complaint.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  private baseUrl = 'http://localhost:8000/complaints';

  constructor(private http: HttpClient) {}

  getComplaints(startDate?: Date, endDate?: Date): Observable<Complaint[]> {
    let params = new HttpParams();
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    if (startDate) {
      params = params.set('from_date', formatDate(startDate));
    }
    if (endDate) {
      params = params.set('to_date', formatDate(endDate));
    }

    return this.http
      .get<{ complaints: ComplaintDto[] }>(this.baseUrl, { params })
      .pipe(
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

  getComplaintById(id: string): Observable<ComplaintDto> {
    return this.http.get<ComplaintDto>(`${this.baseUrl}/${id}`);
  }

  getComplaintsGroupByTypes(): Observable<ComplaintTypesDto> {
    return this.http.get<ComplaintTypesDto>(`${this.baseUrl}/group/types`);
  }

  getComplaintsGroupByMoment(): Observable<ComplaintAtMomentDto> {
    return this.http.get<ComplaintAtMomentDto>(
      `${this.baseUrl}/group/at_moment`
    );
  }
}
