import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Schedule {
  id: number;
  descricao: string;
  horario_inicio: string;
  horario_fim: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = `${environment.apiUrl}/schedules`; // Atualize com o URL da sua API

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  updateSchedule(id: number, schedule: Schedule): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
