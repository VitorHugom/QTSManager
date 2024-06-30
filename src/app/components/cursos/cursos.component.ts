import { Component, OnInit } from '@angular/core';
import { CursosService, Curso } from '../../services/curso.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  filteredCursos: Curso[] = [];
  searchQuery: string = '';
  searchBy: string = 'id';

  constructor(private cursosService: CursosService, private router: Router) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe((data: Curso[]) => {
      this.cursos = data.sort((a, b) => a.id - b.id); // Ordenar pelo ID
      this.filteredCursos = this.cursos;
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredCursos = this.cursos;
    } else {
      this.filteredCursos = this.cursos.filter(curso => {
        if (this.searchBy === 'id') {
          return curso.id.toString().includes(this.searchQuery);
        } else if (this.searchBy === 'nome_curso') {
          return curso.nome_curso.toLowerCase().includes(this.searchQuery.toLowerCase());
        } else if (this.searchBy === 'carga_horaria') {
          return curso.carga_horaria.toString().includes(this.searchQuery);
        }
        return false;
      });
    }
  }

  onNewCurso(): void {
    this.router.navigate(['/cursos/new']);
  }

  onEditCurso(id: number): void {
    this.router.navigate(['/cursos', id]);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
