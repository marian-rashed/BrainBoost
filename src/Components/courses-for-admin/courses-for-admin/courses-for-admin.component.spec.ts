import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesForAdminComponent } from './courses-for-admin.component';

describe('CoursesForAdminComponent', () => {
  let component: CoursesForAdminComponent;
  let fixture: ComponentFixture<CoursesForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
