import { Component, OnInit } from '@angular/core';
import { DisciplinaService, Disciplina } from '../../services/disciplinas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  filteredDisciplinas: Disciplina[] = [];
  searchQuery: string = '';
  searchBy: string = 'id';

  constructor(private disciplinaService: DisciplinaService, private router: Router) {}

  ngOnInit(): void {
    this.loadDisciplinas();
  }

  loadDisciplinas(): void {
    this.disciplinaService.getDisciplinas().subscribe((data: Disciplina[]) => {
      this.disciplinas = data.sort((a, b) => a.id - b.id); // Ordenar pelo ID
      this.filteredDisciplinas = this.disciplinas;
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredDisciplinas = this.disciplinas;
    } else {
      this.filteredDisciplinas = this.disciplinas.filter(disciplina => {
        if (this.searchBy === 'id') {
          return disciplina.id.toString().includes(this.searchQuery);
        } else if (this.searchBy === 'description') {
          return disciplina.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
        return false;
      });
    }
  }

  onNewDisciplina(): void {
    this.router.navigate(['/disciplinas/new']);
  }

  onEditDisciplina(id: number): void {
    this.router.navigate(['/disciplinas', id]);
  }
}
