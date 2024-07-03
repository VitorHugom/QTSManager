import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Discipline {
  id: number;
  description: string;
  workload: number;
}

export interface DayOfWeek {
  id: number;
  dia_da_semana: string;
  status: boolean;
}

export interface Course {
  id: number;
  nome_curso: string;
  disciplines: Discipline[];
}

export interface Professor {
  id: number;
  nome_professor: string;
  disciplines: Discipline[];
  daysOfWeek: DayOfWeek[];
  courses: Course[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  private apiUrl = `${environment.apiUrl}/professors`;
  private disciplinesUrl = `${environment.apiUrl}/disciplines`;
  private daysOfWeekUrl = `${environment.apiUrl}/days_of_week`;
  private coursesUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  getProfessor(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`);
  }

  addProfessor(professor: Partial<Professor> & { disciplineIds: number[], daysOfWeekIds: number[], coursesIds: number[] }): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor);
  }

  updateProfessor(professor: Partial<Professor> & { disciplineIds: number[], daysOfWeekIds: number[], coursesIds: number[] }): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${professor.id}`, professor);
  }

  deleteProfessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.disciplinesUrl);
  }

  getDaysOfWeek(): Observable<DayOfWeek[]> {
    return this.http.get<DayOfWeek[]>(this.daysOfWeekUrl);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  }
}
