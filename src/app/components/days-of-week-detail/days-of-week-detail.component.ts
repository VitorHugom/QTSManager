import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DaysOfWeekService, DayOfWeek, Schedule } from '../../services/days-of-week.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-day-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './days-of-week-detail.component.html',
  styleUrls: ['./days-of-week-detail.component.scss']
})
export class DaysOfWeekDetailComponent implements OnInit {
  day: DayOfWeek = { id: 0, dia_da_semana: '', status: true, schedules: [] };
  isNew: boolean = true;
  allSchedules: Schedule[] = [];
  linkedSchedules: Schedule[] = [];
  availableSchedules: Schedule[] = [];

  constructor(
    private daysOfWeekService: DaysOfWeekService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.daysOfWeekService.getDayOfWeek(+id).subscribe((data: DayOfWeek) => {
        this.day = data;
        this.linkedSchedules = data.schedules;
        this.loadSchedules();
      });
    } else {
      this.loadSchedules();
    }
  }

  loadSchedules(): void {
    this.daysOfWeekService.getSchedules().subscribe((schedules: Schedule[]) => {
      this.allSchedules = schedules;
      this.filterAvailableSchedules();
    });
  }

  filterAvailableSchedules(): void {
    const linkedIds = this.linkedSchedules.map(s => s.id);
    this.availableSchedules = this.allSchedules.filter(s => !linkedIds.includes(s.id));
  }

  linkSchedule(schedule: Schedule): void {
    this.linkedSchedules.push(schedule);
    this.filterAvailableSchedules();
  }

  unlinkSchedule(schedule: Schedule): void {
    this.linkedSchedules = this.linkedSchedules.filter(s => s.id !== schedule.id);
    this.filterAvailableSchedules();
  }

  onSave(): void {
    const scheduleIds = this.linkedSchedules.map(schedule => schedule.id);
    const dayData = {
      ...this.day,
      scheduleIds
    };

    if (this.isNew) {
      this.daysOfWeekService.addDayOfWeek(dayData).subscribe(() => {
        this.router.navigate(['/days-of-week']);
      });
    } else {
      this.daysOfWeekService.updateDayOfWeek(dayData).subscribe(() => {
        this.router.navigate(['/days-of-week']);
      });
    }
  }

  onDelete(): void {
    this.daysOfWeekService.deleteDayOfWeek(this.day.id).subscribe(() => {
      this.router.navigate(['/days-of-week']);
    });
  }

  navigateToDaysOfWeek(): void {
    this.router.navigate(['/days-of-week']);
  }
}
