import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DisciplinaDetailComponent } from './disciplina-detail.component';
import { DisciplinaService, Disciplina } from '../../services/disciplinas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParamMap, ActivatedRouteSnapshot } from '@angular/router';

describe('DisciplinaDetailComponent', () => {
  let component: DisciplinaDetailComponent;
  let fixture: ComponentFixture<DisciplinaDetailComponent>;
  let mockDisciplinaService: Partial<DisciplinaService>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockDisciplinaService = {
      getDisciplina: jasmine.createSpy('getDisciplina').and.returnValue(of({ id: 1, description: 'Test', workload: 100 })),
      addDisciplina: jasmine.createSpy('addDisciplina').and.returnValue(of({})),
      updateDisciplina: jasmine.createSpy('updateDisciplina').and.returnValue(of({}))
    };

    mockRouter = { navigate: jasmine.createSpy('navigate') };

    const mockParamMap: ParamMap = {
      get: jasmine.createSpy('get').and.returnValue('1'),
      has: jasmine.createSpy('has').and.returnValue(true),
      getAll: jasmine.createSpy('getAll').and.returnValue(['1']),
      keys: []
    };

    const mockSnapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: mockParamMap,
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: {},
      outlet: '',
      component: null,
      routeConfig: null,
      root: {} as ActivatedRouteSnapshot,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
    };

    mockActivatedRoute = { snapshot: mockSnapshot as ActivatedRouteSnapshot };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [DisciplinaDetailComponent],
      providers: [
        { provide: DisciplinaService, useValue: mockDisciplinaService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to disciplinas', () => {
    component.navigateToDisciplinas();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/disciplinas']);
  });

  it('should initialize with disciplina data', () => {
    expect(component.disciplina).toEqual({ id: 1, description: 'Test', workload: 100 });
    expect(component.isNew).toBeFalse();
  });

  it('should add new disciplina on save when isNew is true', () => {
    component.isNew = true;
    component.disciplina = { id: 0, description: 'New Test', workload: 50 };
    component.onSave();
    expect(mockDisciplinaService.addDisciplina).toHaveBeenCalledWith(component.disciplina);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/disciplinas']);
  });

  it('should update disciplina on save when isNew is false', () => {
    component.isNew = false;
    component.disciplina = { id: 1, description: 'Updated Test', workload: 50 };
    component.onSave();
    expect(mockDisciplinaService.updateDisciplina).toHaveBeenCalledWith(component.disciplina);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/disciplinas']);
  });
});
