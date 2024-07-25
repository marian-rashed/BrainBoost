import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateModalComponent } from './admin-update-modal.component';

describe('AdminUpdateModalComponent', () => {
  let component: AdminUpdateModalComponent;
  let fixture: ComponentFixture<AdminUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
