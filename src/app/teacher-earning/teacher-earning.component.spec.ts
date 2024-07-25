import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEarningComponent } from './teacher-earning.component';

describe('TeacherEarningComponent', () => {
  let component: TeacherEarningComponent;
  let fixture: ComponentFixture<TeacherEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherEarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
