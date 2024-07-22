// src/app/services/card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Complaint,
  ComplaintAgeDto,
  ComplaintAtMomentDto,
  ComplaintDto,
  ComplaintGendersDto,
  ComplaintMonthsDto,
  ComplaintNeighborhoodDto,
  ComplaintTypesDto,
} from '../models/complaint.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  private baseUrl = 'http://localhost:8000/complaints';

  constructor(private http: HttpClient) {}

  private TYPE_TRANSLATIONS: { [key: string]: string } = {
    GROPING: 'Agressão física',
    STALKING: 'Perseguição',
    UNWANTED_PHOTOS: 'Fotos indesejadas',
    UNWANTED_COMMENTS: 'Comentários indesejados',
    THREATENING: 'Ameaça',
    FLASHING: 'Exibição indecente',
  };
  private GENDER_TRANSLATIONS: { [key: string]: string } = {
    CIS_MALE: 'Homem cis',
    CIS_FEMALE: 'Mulher cis',
    TRANS_MALE: 'Homem trans',
    TRANS_FEMALE: 'Mulher trans',
    OTHER: 'Outro',
  };

  private ETHNICITY_TRANSLATIONS: { [key: string]: string } = {
    BLACK: 'Negro',
    BROWN: 'Pardo',
    WHITE: 'Branco',
    OTHER: 'Outro',
  };

  private SITUATION_TRANSLATIONS: { [key: string]: string } = {
    VICTIM: 'Vítima',
    WITNESS: 'Testemunha',
  };

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
            type: this.TYPE_TRANSLATIONS[complaint.type] || complaint.type,
          }))
        )
      );
  }

  getComplaintById(id: string): Observable<ComplaintDto> {
    return this.http.get<ComplaintDto>(`${this.baseUrl}/${id}`).pipe(
      map((data: ComplaintDto) => {
        return {
          ...data,
          type: this.TYPE_TRANSLATIONS[data.type] || data.type,
          user_gender:
            this.GENDER_TRANSLATIONS[data.user_gender] || data.user_gender,
          user_ethnicity:
            this.ETHNICITY_TRANSLATIONS[data.user_ethnicity] ||
            data.user_ethnicity,
          situation:
            this.SITUATION_TRANSLATIONS[data.situation] || data.situation,
        };
      })
    );
  }

  getComplaintsGroupByTypes(): Observable<ComplaintTypesDto> {
    return this.http.get<ComplaintTypesDto>(`${this.baseUrl}/group/types`);
  }

  getComplaintsGroupByMoment(): Observable<ComplaintAtMomentDto> {
    return this.http.get<ComplaintAtMomentDto>(
      `${this.baseUrl}/group/at_moment`
    );
  }

  getComplaintsGroupByGender(): Observable<ComplaintGendersDto> {
    return this.http.get<ComplaintGendersDto>(`${this.baseUrl}/group/genders`);
  }

  getComplaintsGroupByAge(): Observable<ComplaintAgeDto> {
    return this.http.get<ComplaintAgeDto>(`${this.baseUrl}/group/age_group`);
  }

  getComplaintsGroupByMonths(): Observable<ComplaintMonthsDto> {
    return this.http.get<ComplaintMonthsDto>(`${this.baseUrl}/group/months`);
  }

  getComplaintsGroupByNeighborhood(): Observable<ComplaintNeighborhoodDto[]> {
    return this.http.get<ComplaintNeighborhoodDto[]>(
      `${this.baseUrl}/group/neighborhoods`
    );
  }
}
