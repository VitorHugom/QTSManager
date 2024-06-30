import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService, Schedule } from '../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {
  schedule: Schedule = { id: 0, descricao: '', horario_inicio: '', horario_fim: '' };
  isNew: boolean = true;

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.scheduleService.getScheduleById(Number(id)).subscribe((data: Schedule) => {
        this.schedule = data;
      });
    }
  }

  onSave(): void {
    if (this.isNew) {
      this.scheduleService.createSchedule(this.schedule).subscribe(() => {
        this.router.navigate(['/schedules']);
      });
    } else {
      this.scheduleService.updateSchedule(this.schedule.id, this.schedule).subscribe(() => {
        this.router.navigate(['/schedules']);
      });
    }
  }
  navigateToSchedules(): void {
    this.router.navigate(['/schedules']);
  }
  onDelete(): void {
    this.scheduleService.deleteSchedule(this.schedule.id).subscribe(() => {
      this.router.navigate(['/schedules']);
    });
}
}
