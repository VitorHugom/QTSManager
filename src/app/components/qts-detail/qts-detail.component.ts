import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QtsService, QtsResponseDTO, Schedule, QtsSchedule } from '../../services/qts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qts-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qts-detail.component.html',
  styleUrls: ['./qts-detail.component.scss']
})
export class QtsDetailComponent implements OnInit {
  qts: QtsResponseDTO | null = null;
  id: number | null = null;
  daysOfWeek: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  uniqueSchedules: Schedule[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qtsService: QtsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.loadQts(this.id);
      }
    });
  }

  loadQts(id: number): void {
    this.qtsService.getQtsById(id).subscribe((data: QtsResponseDTO) => {
      this.qts = data;
      this.uniqueSchedules = this.getUniqueSchedules(data.qtsSchedules);
      console.log('Loaded QTS:', data); // Log the entire QTS data
    });
  }

  getUniqueSchedules(qtsSchedules: QtsSchedule[]): Schedule[] {
    const uniqueSchedules: Schedule[] = [];
    const scheduleMap = new Map<number, Schedule>();

    for (const qtsSchedule of qtsSchedules) {
      const schedule = qtsSchedule.schedule;
      if (!scheduleMap.has(schedule.id)) {
        scheduleMap.set(schedule.id, schedule);
        uniqueSchedules.push(schedule);
      }
    }

    return uniqueSchedules;
  }

  getQtsScheduleForDayAndTime(day: string, schedule: Schedule): QtsSchedule[] {
    if (!this.qts) {
      return [];
    }

    const filteredSchedules = this.qts.qtsSchedules.filter(qtsSchedule => {
      const dayOfWeek = qtsSchedule.daysOfWeek.dia_da_semana.trim().toLowerCase();
      const targetDay = day.trim().toLowerCase();
      const scheduleId = qtsSchedule.schedule.id;

      console.log(`Comparing: ${dayOfWeek} with ${targetDay} for schedule id ${scheduleId}`);

      return dayOfWeek === targetDay && scheduleId === schedule.id;
    });

    console.log('Day:', day);
    console.log('Schedule:', schedule);
    console.log('Filtered Schedules:', filteredSchedules);

    return filteredSchedules;
  }

  printQts(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/gerar-qts']);
  }

  deleteQts(): void {
    if (this.id) {
      this.qtsService.deleteQts(this.id).subscribe(() => {
        this.router.navigate(['/gerar-qts']);
      });
    }
  }
}
