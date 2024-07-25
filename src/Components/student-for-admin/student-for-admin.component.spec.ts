import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentForAdminComponent } from './student-for-admin.component';

describe('StudentForAdminComponent', () => {
  let component: StudentForAdminComponent;
  let fixture: ComponentFixture<StudentForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
