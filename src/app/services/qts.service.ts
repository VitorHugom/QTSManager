import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QtsService {
  private apiUrl = 'http://localhost:8080/qts';

  constructor(private http: HttpClient) {}

  generateQts(courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { courseId });
  }
}
