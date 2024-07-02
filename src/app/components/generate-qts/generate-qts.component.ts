import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService, Curso } from '../../services/curso.service';
import { QtsService, QtsBasicResponseDTO } from '../../services/qts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-qts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-qts.component.html',
  styleUrls: ['./generate-qts.component.scss']
})
export class GenerateQtsComponent implements OnInit {
  courses: Curso[] = [];
  selectedCourse: Curso | null = null;
  searchQuery: string = '';
  searchBy: string = 'id';
  qtsList: QtsBasicResponseDTO[] = [];
  filteredQts: QtsBasicResponseDTO[] = [];

  constructor(
    private cursosService: CursosService,
    private qtsService: QtsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadQts();
  }

  loadCourses(): void {
    this.cursosService.getCursos().subscribe((data: Curso[]) => {
      this.courses = data;
    });
  }

  loadQts(): void {
    this.qtsService.getQtsBasic().subscribe((data: QtsBasicResponseDTO[]) => {
      this.qtsList = data;
      this.filteredQts = this.qtsList;
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  generateQts(): void {
    if (this.selectedCourse) {
      this.qtsService.generateQts(this.selectedCourse.nome_curso).subscribe(
        (response) => {
          console.log('QTS gerado com sucesso:', response);
          alert('QTS gerado com sucesso!');
          this.loadQts(); // Reload QTS list after generating new QTS
        },
        (error) => {
          console.error('Erro ao gerar QTS:', error);
          alert('Erro ao gerar QTS.');
        }
      );
    } else {
      alert('Por favor, selecione um curso.');
    }
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredQts = this.qtsList;
    } else {
      this.filteredQts = this.qtsList.filter(qts => {
        if (this.searchBy === 'id') {
          return qts.id.toString().includes(this.searchQuery);
        } else if (this.searchBy === 'courseName') {
          return qts.course.nomeCurso.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
        return false;
      });
    }
  }

  onViewQts(id: number): void {
    this.router.navigate(['/qts', id]);
  }
}
