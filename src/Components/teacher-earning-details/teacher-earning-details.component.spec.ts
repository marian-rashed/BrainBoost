import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEarningDetailsComponent } from './teacher-earning-details.component';

describe('TeacherEarningDetailsComponent', () => {
  let component: TeacherEarningDetailsComponent;
  let fixture: ComponentFixture<TeacherEarningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherEarningDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherEarningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
