import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disciplina } from './disciplinas.service';
import { environment } from '../../environments/environment';

export interface Curso {
  id: number;
  nome_curso: string;
  carga_horaria: number;
  disciplines: Disciplina[];
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = `${environment.apiUrl}/courses`;
  private disciplinasUrl = `${environment.apiUrl}/disciplines`;

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  createCurso(curso: Partial<Curso> & { disciplineIds: number[] }): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(curso: Partial<Curso> & { disciplineIds: number[] }): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDisciplines(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.disciplinasUrl);
  }
}
