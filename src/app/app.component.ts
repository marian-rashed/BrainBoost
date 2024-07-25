import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../Components/navbar/navbar.component';

import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,HttpClientModule,CommonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BrainBoost';
  constructor(private authService: AuthService ){
    authService.loadUserData();
  }
}
