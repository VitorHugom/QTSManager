import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorsService, Professor, Discipline, DayOfWeek } from '../../services/professor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professor-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professores-detail.component.html',
  styleUrls: ['./professores-detail.component.scss']
})
export class ProfessorDetailComponent implements OnInit {
  professor: Professor = { id: 0, nome_professor: '', disciplines: [], daysOfWeek: [] };
  isNew: boolean = true;
  allDisciplines: Discipline[] = [];
  linkedDisciplines: Discipline[] = [];
  availableDisciplines: Discipline[] = [];
  allDaysOfWeek: DayOfWeek[] = [];
  linkedDaysOfWeek: DayOfWeek[] = [];
  availableDaysOfWeek: DayOfWeek[] = [];

  constructor(
    private professorsService: ProfessorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.professorsService.getProfessor(+id).subscribe((data: Professor) => {
        this.professor = data;
        this.linkedDisciplines = data.disciplines;
        this.linkedDaysOfWeek = data.daysOfWeek;
        this.loadDisciplines();
        this.loadDaysOfWeek();
      });
    } else {
      this.loadDisciplines();
      this.loadDaysOfWeek();
    }
  }

  loadDisciplines(): void {
    this.professorsService.getDisciplines().subscribe((disciplines: Discipline[]) => {
      this.allDisciplines = disciplines;
      this.filterAvailableDisciplines();
    });
  }

  loadDaysOfWeek(): void {
    this.professorsService.getDaysOfWeek().subscribe((daysOfWeek: DayOfWeek[]) => {
      this.allDaysOfWeek = daysOfWeek;
      this.filterAvailableDaysOfWeek();
    });
  }

  filterAvailableDisciplines(): void {
    const linkedIds = this.linkedDisciplines.map(d => d.id);
    this.availableDisciplines = this.allDisciplines.filter(d => !linkedIds.includes(d.id));
  }

  filterAvailableDaysOfWeek(): void {
    const linkedIds = this.linkedDaysOfWeek.map(d => d.id);
    this.availableDaysOfWeek = this.allDaysOfWeek.filter(d => !linkedIds.includes(d.id));
  }

  linkDiscipline(discipline: Discipline): void {
    this.linkedDisciplines.push(discipline);
    this.filterAvailableDisciplines();
  }

  unlinkDiscipline(discipline: Discipline): void {
    this.linkedDisciplines = this.linkedDisciplines.filter(d => d.id !== discipline.id);
    this.filterAvailableDisciplines();
  }

  linkDayOfWeek(day: DayOfWeek): void {
    this.linkedDaysOfWeek.push(day);
    this.filterAvailableDaysOfWeek();
  }

  unlinkDayOfWeek(day: DayOfWeek): void {
    this.linkedDaysOfWeek = this.linkedDaysOfWeek.filter(d => d.id !== day.id);
    this.filterAvailableDaysOfWeek();
  }

  onSave(): void {
    const disciplineIds = this.linkedDisciplines.map(d => d.id);
    const daysOfWeekIds = this.linkedDaysOfWeek.map(d => d.id);
    const professorData = {
      ...this.professor,
      disciplineIds,
      daysOfWeekIds
    };

    if (this.isNew) {
      this.professorsService.addProfessor(professorData).subscribe(() => {
        this.router.navigate(['/professores']);
      });
    } else {
      this.professorsService.updateProfessor(professorData).subscribe(() => {
        this.router.navigate(['/professores']);
      });
    }
  }

  onDelete(): void {
    this.professorsService.deleteProfessor(this.professor.id).subscribe(() => {
      this.router.navigate(['/professores']);
    });
  }

  navigateToProfessors(): void {
    this.router.navigate(['/professores']);
  }
}
