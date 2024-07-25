import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedQuizComponent } from './modified-quiz.component';

describe('ModifiedQuizComponent', () => {
  let component: ModifiedQuizComponent;
  let fixture: ComponentFixture<ModifiedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiedQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifiedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
