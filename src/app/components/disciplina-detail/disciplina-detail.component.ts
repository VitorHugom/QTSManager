import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService, Disciplina } from '../../services/disciplinas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-disciplina-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disciplina-detail.component.html',
  styleUrls: ['./disciplina-detail.component.scss']
})
export class DisciplinaDetailComponent implements OnInit {
  disciplina: Disciplina = { id: 0, description: '', workload: 0 };
  isNew: boolean = true;

  constructor(
    private disciplinaService: DisciplinaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.disciplinaService.getDisciplina(+id).subscribe((data: Disciplina) => {
        this.disciplina = data;
      });
    }
  }

  onSave(): void {
    if (this.isNew) {
      this.disciplinaService.addDisciplina(this.disciplina).subscribe(() => {
        this.router.navigate(['/disciplinas']);
      });
    } else {
      this.disciplinaService.updateDisciplina(this.disciplina).subscribe(() => {
        this.router.navigate(['/disciplinas']);
      });
    }
  }

  navigateToDisciplinas(): void {
    this.router.navigate(['/disciplinas']);
  }
}
