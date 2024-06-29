import { Component, OnInit } from '@angular/core';
import { ScheduleService, Schedule } from '../../services/schedule.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  schedules: Schedule[] = [];
  filteredSchedules: Schedule[] = [];
  searchQuery: string = '';
  searchBy: string = 'id';

  constructor(private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.getSchedules().subscribe((data: Schedule[]) => {
      this.schedules = data.sort((a, b) => a.id - b.id); // Ordenar pelo ID
      this.filteredSchedules = this.schedules;
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredSchedules = this.schedules;
    } else {
      this.filteredSchedules = this.schedules.filter(schedule => {
        if (this.searchBy === 'id') {
          return schedule.id.toString().includes(this.searchQuery);
        } else if (this.searchBy === 'descricao') {
          return schedule.descricao.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
        return false;
      });
    }
  }

  onNewSchedule(): void {
    this.router.navigate(['/schedules/new']);
  }

  onEditSchedule(id: number): void {
    this.router.navigate(['/schedules', id]);
  }
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
