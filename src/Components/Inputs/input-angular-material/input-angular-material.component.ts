import {Component, EventEmitter, Input, Output, input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-input-angular-material',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './input-angular-material.component.html',
  styleUrl: './input-angular-material.component.css'
})
export class InputAngularMaterialComponent {
  @Input() value:any;
  @Input() PlaceHolder='' 
  @Input() type='text'
  @Input() class: string = '';
  @Output() valueChanged=new EventEmitter<any>()
}
