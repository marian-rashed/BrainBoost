import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseQuestionsComponent } from './add-course-questions.component';

describe('AddCourseQuestionsComponent', () => {
  let component: AddCourseQuestionsComponent;
  let fixture: ComponentFixture<AddCourseQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCourseQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
