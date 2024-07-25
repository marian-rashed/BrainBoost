import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonApprovedCouresesComponent } from './non-approved-coureses.component';

describe('NonApprovedCouresesComponent', () => {
  let component: NonApprovedCouresesComponent;
  let fixture: ComponentFixture<NonApprovedCouresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonApprovedCouresesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonApprovedCouresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
