import { Component, Input,EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auto-select-angular-material',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './auto-select-angular-material.component.html',
  styleUrl: './auto-select-angular-material.component.css',
})
export class AutoSelectAngularMaterialComponent implements OnChanges {
  @Input() myControl = new FormControl("");
  @Input() value:string= ""
  @Input() options: string[] = [];
  @Input() placeHolder: string = '';
  @Input() class: string = '';
  @Output() optionSelected = new EventEmitter<any>();
  filteredOptions: Observable<string[]> | undefined;
selectedOption: any;
  constructor(private http:HttpClient){}
  ngOnChanges(changes: SimpleChanges): void {
    this.myControl.setValue(this.value)
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
