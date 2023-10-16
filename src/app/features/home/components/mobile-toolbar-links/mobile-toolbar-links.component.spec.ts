import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileToolbarLinksComponent } from './mobile-toolbar-links.component';

describe('MobileToolbarLinksComponent', () => {
  let component: MobileToolbarLinksComponent;
  let fixture: ComponentFixture<MobileToolbarLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MobileToolbarLinksComponent]
    });
    fixture = TestBed.createComponent(MobileToolbarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
