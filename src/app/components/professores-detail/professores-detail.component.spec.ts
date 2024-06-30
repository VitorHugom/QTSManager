import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDetailComponent } from './professores-detail.component';

describe('ProfessoresDetailComponent', () => {
  let component: ProfessorDetailComponent;
  let fixture: ComponentFixture<ProfessorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
