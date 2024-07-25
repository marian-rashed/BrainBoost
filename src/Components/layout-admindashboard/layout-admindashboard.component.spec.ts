import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdmindashboardComponent } from './layout-admindashboard.component';

describe('LayoutAdmindashboardComponent', () => {
  let component: LayoutAdmindashboardComponent;
  let fixture: ComponentFixture<LayoutAdmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAdmindashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutAdmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
