import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormErrorComponent } from './template-form-error.component';

describe('TemplateFormErrorComponent', () => {
  let component: TemplateFormErrorComponent;
  let fixture: ComponentFixture<TemplateFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateFormErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateFormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
