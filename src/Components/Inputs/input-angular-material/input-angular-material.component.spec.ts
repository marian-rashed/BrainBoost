import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAngularMaterialComponent } from './input-angular-material.component';

describe('InputAngularMaterialComponent', () => {
  let component: InputAngularMaterialComponent;
  let fixture: ComponentFixture<InputAngularMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAngularMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputAngularMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
