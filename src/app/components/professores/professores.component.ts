import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface Professor {
  id: number;
  nome_professor: string;
  disciplineIds: number[];
  daysOfWeekIds: number[];
}

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {
  professores: Professor[] = [];
  filteredProfessores: Professor[] = [];
  searchQuery: string = '';
  searchBy: string = 'id';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProfessores();
  }

  loadProfessores(): void {
    this.http.get<Professor[]>(`${environment.apiUrl}/professors`)
      .subscribe((data: Professor[]) => {
        this.professores = data.sort((a, b) => a.id - b.id);
        this.filteredProfessores = this.professores;
      });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredProfessores = this.professores;
    } else {
      this.filteredProfessores = this.professores.filter(professor => {
        if (this.searchBy === 'id') {
          return professor.id.toString().includes(this.searchQuery);
        } else if (this.searchBy === 'nome_professor') {
          return professor.nome_professor.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
        return false;
      });
    }
  }

  onNewProfessor(): void {
    this.router.navigate(['/professores/new']);
  }

  onEditProfessor(id: number): void {
    this.router.navigate(['/professores', id]);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
