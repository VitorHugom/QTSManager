import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DayOfWeek {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DaysOfWeekService {
  private apiUrl = 'http://localhost:8080/days_of_week';

  constructor(private http: HttpClient) {}

  getDaysOfWeek(): Observable<DayOfWeek[]> {
    return this.http.get<DayOfWeek[]>(this.apiUrl);
  }

  getDayOfWeek(id: number): Observable<DayOfWeek> {
    return this.http.get<DayOfWeek>(`${this.apiUrl}/${id}`);
  }

  addDayOfWeek(day: DayOfWeek): Observable<DayOfWeek> {
    return this.http.post<DayOfWeek>(this.apiUrl, day);
  }

  updateDayOfWeek(day: DayOfWeek): Observable<DayOfWeek> {
    return this.http.put<DayOfWeek>(`${this.apiUrl}/${day.id}`, day);
  }

  deleteDayOfWeek(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSchedulesByDayOfWeek(id: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/${id}/schedules`);
  }
}

export interface Schedule {
  id: number;
  disciplineId: number;
  dayOfWeekId: number;
  startTime: string;
  endTime: string;
}
