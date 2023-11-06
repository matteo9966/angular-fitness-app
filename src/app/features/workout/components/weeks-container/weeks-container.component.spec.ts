import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksContainerComponent } from './weeks-container.component';

describe('WeeksContainerComponent', () => {
  let component: WeeksContainerComponent;
  let fixture: ComponentFixture<WeeksContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeeksContainerComponent]
    });
    fixture = TestBed.createComponent(WeeksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
