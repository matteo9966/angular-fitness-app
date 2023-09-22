import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardContainerComponent } from './news-card-container.component';

describe('NewsCardContainerComponent', () => {
  let component: NewsCardContainerComponent;
  let fixture: ComponentFixture<NewsCardContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsCardContainerComponent]
    });
    fixture = TestBed.createComponent(NewsCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
