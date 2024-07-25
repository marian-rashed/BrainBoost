import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSelectAngularMaterialComponent } from './auto-select-angular-material.component';

describe('AutoSelectAngularMaterialComponent', () => {
  let component: AutoSelectAngularMaterialComponent;
  let fixture: ComponentFixture<AutoSelectAngularMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoSelectAngularMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoSelectAngularMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
