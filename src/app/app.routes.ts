import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { GerarQtsComponent } from './components/gerar-qts/gerar-qts.component';
import { DisciplinaDetailComponent } from './components/disciplina-detail/disciplina-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'disciplinas', component: DisciplinasComponent },
  { path: 'disciplinas/new', component: DisciplinaDetailComponent },
  { path: 'disciplinas/:id', component: DisciplinaDetailComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'gerar-qts', component: GerarQtsComponent }
];
