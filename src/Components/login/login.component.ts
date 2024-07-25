import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    RouterLinkActive,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  credentials = { userName: '', password: '' };
  returnUrl!: string;
  errorMessage: string | null = null; // Property for storing error message

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.authService
      .login({
        userName: this.loginForm.value['userName']!,
        password: this.loginForm.value['password']!,
      })
      .subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.authService.decodeUserData();
          this.authService.routeConsideringToRole();
        },
        (error) => {
          console.log('Login failed:', error);
          this.errorMessage =
            'Login failed. Please check your username and password and try again.'; // Set the error message
        }
      );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
