import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Disciplina {
  id: number;
  description: string;
  workload: number;
}

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private apiUrl = `${environment.apiUrl}/disciplines`;

  constructor(private http: HttpClient) {}

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  getDisciplina(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  addDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }

  updateDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.apiUrl}/${disciplina.id}`, disciplina);
  }

  deleteDisciplina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
