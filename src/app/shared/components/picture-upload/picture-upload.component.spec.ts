import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureUploadComponent } from './picture-upload.component';

describe('PictureUploadComponent', () => {
  let component: PictureUploadComponent;
  let fixture: ComponentFixture<PictureUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PictureUploadComponent]
    });
    fixture = TestBed.createComponent(PictureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
