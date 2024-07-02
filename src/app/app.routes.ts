import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { ProfessorDetailComponent } from './components/professores-detail/professores-detail.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoDetailComponent } from './components/curso-detail/curso-detail.component';
import { GenerateQtsComponent } from './components/generate-qts/generate-qts.component';
import { DisciplinaDetailComponent } from './components/disciplina-detail/disciplina-detail.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';
import { DaysOfWeekComponent } from './components/days-of-week/days-of-week.component';
import { DaysOfWeekDetailComponent } from './components/days-of-week-detail/days-of-week-detail.component';
import { QtsDetailComponent } from './components/qts-detail/qts-detail.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'disciplinas', component: DisciplinasComponent },
  { path: 'disciplinas/new', component: DisciplinaDetailComponent },
  { path: 'disciplinas/:id', component: DisciplinaDetailComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'professores/new', component: ProfessorDetailComponent },
  { path: 'professores/:id', component: ProfessorDetailComponent},
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/new', component: CursoDetailComponent },
  { path: 'cursos/:id', component: CursoDetailComponent },
  { path: 'gerar-qts', component: GenerateQtsComponent },
  { path: 'qts/:id', component: QtsDetailComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'schedules/new', component: ScheduleDetailComponent },
  { path: 'schedules/:id', component: ScheduleDetailComponent },
  { path: 'days-of-week', component: DaysOfWeekComponent },
  { path: 'days-of-week/new', component: DaysOfWeekDetailComponent },
  { path: 'days-of-week/:id', component: DaysOfWeekDetailComponent }
];
