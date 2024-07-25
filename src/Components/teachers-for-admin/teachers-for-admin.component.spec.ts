import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersForAdminComponent } from './teachers-for-admin.component';

describe('TeachersForAdminComponent', () => {
  let component: TeachersForAdminComponent;
  let fixture: ComponentFixture<TeachersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeachersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
