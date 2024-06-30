import { Component, OnInit } from '@angular/core';
import { DaysOfWeekService, DayOfWeek } from '../../services/days-of-week.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-days-of-week',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.scss']
})
export class DaysOfWeekComponent implements OnInit {
  daysOfWeek: DayOfWeek[] = [];
  filteredDaysOfWeek: DayOfWeek[] = [];
  searchQuery: string = '';
  searchBy: string = 'id';
  
  constructor(private daysOfWeekService: DaysOfWeekService, private router: Router) {}

  ngOnInit(): void {
    this.loadDaysOfWeek();
  }

  loadDaysOfWeek(): void {
    this.daysOfWeekService.getDaysOfWeek().subscribe((data: DayOfWeek[]) => {
      this.daysOfWeek = data.sort((a, b) => a.id - b.id); // Ordenar pelo ID
      this.filteredDaysOfWeek = this.daysOfWeek;
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredDaysOfWeek = this.daysOfWeek;
    } else {
      this.filteredDaysOfWeek = this.daysOfWeek.filter(day => {
        if (this.searchBy === 'id') {
          return day.id.toString().includes(this.searchQuery);
        } else if (this.searchBy === 'dia_da_semana') {
          return day.dia_da_semana.toLowerCase().includes(this.searchQuery.toLowerCase());
        } else if (this.searchBy === 'status') {
          const statusQuery = this.searchQuery.toLowerCase();
          return (statusQuery === 'ativo' && day.status) || (statusQuery === 'inativo' && !day.status);
        }
        return false;
      });
    }
  }

  onNewDay(): void {
    this.router.navigate(['/days-of-week/new']);
  }

  onEditDay(id: number): void {
    this.router.navigate(['/days-of-week', id]);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
