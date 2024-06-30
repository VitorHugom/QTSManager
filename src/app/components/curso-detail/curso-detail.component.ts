import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService, Curso } from '../../services/curso.service';
import { Disciplina, DisciplinaService } from '../../services/disciplinas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-detail',
  templateUrl: './curso-detail.component.html',
  styleUrls: ['./curso-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CursoDetailComponent implements OnInit {
  curso: Curso = { id: 0, nome_curso: '', carga_horaria: 0, disciplines: [] };
  isNew: boolean = true;
  allDisciplines: Disciplina[] = [];
  availableDisciplinas: Disciplina[] = [];
  linkedDisciplinas: Disciplina[] = [];

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cursoId = this.route.snapshot.paramMap.get('id');
    if (cursoId) {
      this.isNew = false;
      this.cursosService.getCursoById(+cursoId).subscribe((data: Curso) => {
        this.curso = data;
        this.linkedDisciplinas = data.disciplines;
        this.loadDisciplinas();
      });
    } else {
      this.loadDisciplinas();
    }
  }

  loadDisciplinas(): void {
    this.cursosService.getDisciplines().subscribe((disciplina: Disciplina[]) => {
      this.allDisciplines = disciplina;
      this.filterAvailableDisciplines();
    });
  }

  filterAvailableDisciplines(): void {
    const linkedIds = this.linkedDisciplinas.map(s => s.id);
    this.availableDisciplinas = this.allDisciplines.filter(s => !linkedIds.includes(s.id));
  }

  linkDisciplina(disciplina: Disciplina): void {
    this.linkedDisciplinas.push(disciplina);
    this.filterAvailableDisciplines();
  }

  unlinkDisciplina(disciplina: Disciplina): void {
    this.linkedDisciplinas = this.linkedDisciplinas.filter(s => s.id !== disciplina.id);
    this.filterAvailableDisciplines();
  }

  onSave(): void {
    const disciplineIds = this.linkedDisciplinas.map(disciplina => disciplina.id);
    const cursoData: any = {
      nome_curso: this.curso.nome_curso,
      carga_horaria: this.curso.carga_horaria,
      disciplineIds
    };

    if (!this.isNew) {
      cursoData.id = this.curso.id;
    }

    console.log('cursoData:', cursoData);  // Adicionado para debug

    if (this.isNew) {
      this.cursosService.createCurso(cursoData).subscribe(() => {
        this.navigateToCursos();
      });
    } else {
      this.cursosService.updateCurso(cursoData).subscribe(() => {
        this.navigateToCursos();
      });
    }
  }

  onDelete(): void {
    this.cursosService.deleteCurso(this.curso.id).subscribe(() => {
      this.navigateToCursos();
    });
  }

  navigateToCursos(): void {
    this.router.navigate(['/cursos']);
  }
}
