import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdmindashboardComponent } from './sidebar-admindashboard.component';

describe('SidebarAdmindashboardComponent', () => {
  let component: SidebarAdmindashboardComponent;
  let fixture: ComponentFixture<SidebarAdmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAdmindashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarAdmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
