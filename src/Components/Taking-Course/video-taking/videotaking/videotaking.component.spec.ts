import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideotakingComponent } from './videotaking.component';

describe('VideotakingComponent', () => {
  let component: VideotakingComponent;
  let fixture: ComponentFixture<VideotakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideotakingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideotakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
