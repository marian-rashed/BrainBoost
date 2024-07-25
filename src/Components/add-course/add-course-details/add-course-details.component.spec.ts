import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDetailsComponent } from './add-course-details.component';

describe('AddCourseDetailsComponent', () => {
  let component: AddCourseDetailsComponent;
  let fixture: ComponentFixture<AddCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
