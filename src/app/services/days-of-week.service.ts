import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Schedule {
  id: number;
  descricao: string;
  horario_inicio: string;
  horario_fim: string;
}

export interface DayOfWeek {
  id: number;
  dia_da_semana: string;
  status: boolean;
  schedules: Schedule[];
}

@Injectable({
  providedIn: 'root'
})
export class DaysOfWeekService {
  private apiUrl = 'http://localhost:8080/days_of_week';
  private schedulesUrl = 'http://localhost:8080/schedules';

  constructor(private http: HttpClient) {}

  getDaysOfWeek(): Observable<DayOfWeek[]> {
    return this.http.get<DayOfWeek[]>(this.apiUrl);
  }

  getDayOfWeek(id: number): Observable<DayOfWeek> {
    return this.http.get<DayOfWeek>(`${this.apiUrl}/${id}`);
  }

  addDayOfWeek(day: Partial<DayOfWeek> & { scheduleIds: number[] }): Observable<DayOfWeek> {
    return this.http.post<DayOfWeek>(this.apiUrl, day);
  }

  updateDayOfWeek(day: Partial<DayOfWeek> & { scheduleIds: number[] }): Observable<DayOfWeek> {
    return this.http.put<DayOfWeek>(`${this.apiUrl}/${day.id}`, day);
  }

  deleteDayOfWeek(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.schedulesUrl);
  }
}
