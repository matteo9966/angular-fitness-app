import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMonthTableComponent } from './full-month-table.component';

describe('FullMonthTableComponent', () => {
  let component: FullMonthTableComponent;
  let fixture: ComponentFixture<FullMonthTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullMonthTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullMonthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
