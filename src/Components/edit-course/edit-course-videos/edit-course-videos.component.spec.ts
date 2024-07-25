import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseVideosComponent } from './add-course-videos.component';

describe('AddCourseVideosComponent', () => {
  let component: AddCourseVideosComponent;
  let fixture: ComponentFixture<AddCourseVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCourseVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
