import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseWhatToLearnComponent } from './add-course-what-to-learn.component';

describe('AddCourseWhatToLearnComponent', () => {
  let component: AddCourseWhatToLearnComponent;
  let fixture: ComponentFixture<AddCourseWhatToLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseWhatToLearnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCourseWhatToLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
