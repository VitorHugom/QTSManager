import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarQtsComponent } from './gerar-qts.component';

describe('GerarQtsComponent', () => {
  let component: GerarQtsComponent;
  let fixture: ComponentFixture<GerarQtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerarQtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarQtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
