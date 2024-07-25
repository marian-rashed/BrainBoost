import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoureDetails } from '../../../classes/coure-details';
import { CourseDetailsComponent } from '../../course-details/course-details.component';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule , CommonModule , FormsModule , CourseDetailsComponent],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  @Input() isLoading: boolean = false;

  ngOnInit(): void {}
}
