import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService, Curso } from '../../services/curso.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QtsService } from '../../services/qts.service';

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

  constructor(
    private cursosService: CursosService,
    private qtsService: QtsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.cursosService.getCursos().subscribe((data: Curso[]) => {
      this.courses = data;
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  generateQts(): void {
    if (this.selectedCourse) {
      this.qtsService.generateQts(this.selectedCourse.id).subscribe(
        (response) => {
          console.log('QTS gerado com sucesso:', response);
          alert('QTS gerado com sucesso!');
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
}