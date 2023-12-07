import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSubFormComponent } from './address-sub-form.component';

describe('AddressSubFormComponent', () => {
  let component: AddressSubFormComponent;
  let fixture: ComponentFixture<AddressSubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressSubFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
