import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentFailedComponent } from './enrollment-failed.component';

describe('EnrollmentFailedComponent', () => {
  let component: EnrollmentFailedComponent;
  let fixture: ComponentFixture<EnrollmentFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentFailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollmentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
