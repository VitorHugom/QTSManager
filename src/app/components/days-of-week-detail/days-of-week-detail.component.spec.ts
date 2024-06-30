import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfWeekDetailComponent } from './days-of-week-detail.component';

describe('DaysOfWeekDetailComponent', () => {
  let component: DaysOfWeekDetailComponent;
  let fixture: ComponentFixture<DaysOfWeekDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysOfWeekDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysOfWeekDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
