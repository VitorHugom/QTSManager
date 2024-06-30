import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQtsComponent } from './generate-qts.component';

describe('GenerateQtsComponent', () => {
  let component: GenerateQtsComponent;
  let fixture: ComponentFixture<GenerateQtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
