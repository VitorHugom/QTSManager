import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  nomeCurso: string;
  carga_horaria: number;
  disciplines: any[];
}

export interface QtsBasicResponseDTO {
  id: number;
  course: Course;
}

export interface Discipline {
  id: number;
  description: string;
  workload: number;
}

export interface Professor {
  id: number;
  nome_professor: string;
}

export interface Schedule {
  id: number;
  descricao: string;
  horario_inicio: string;
  horario_fim: string;
}

export interface DaysOfWeek {
  id: number;
  dia_da_semana: string;
  status: boolean;
}

export interface QtsSchedule {
  id: number;
  discipline: Discipline;
  professor: Professor;
  schedule: Schedule;
  daysOfWeek: DaysOfWeek;
}

export interface QtsResponseDTO {
  id: number;
  course: Course;
  qtsSchedules: QtsSchedule[];
}

@Injectable({
  providedIn: 'root'
})
export class QtsService {
  private apiUrl = 'http://localhost:8080/qts';

  constructor(private http: HttpClient) {}

  generateQts(courseName: String): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { courseName });
  }

  getQtsBasic(): Observable<QtsBasicResponseDTO[]> {
    return this.http.get<QtsBasicResponseDTO[]>(`${this.apiUrl}/basic`);
  }
  
  getQtsById(id: number): Observable<QtsResponseDTO> {
    return this.http.get<QtsResponseDTO>(`${this.apiUrl}/${id}`);
  }
  deleteQts(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
