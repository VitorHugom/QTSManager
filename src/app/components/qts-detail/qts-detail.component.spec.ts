import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtsDetailComponent } from './qts-detail.component';

describe('QtsDetailComponent', () => {
  let component: QtsDetailComponent;
  let fixture: ComponentFixture<QtsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QtsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
