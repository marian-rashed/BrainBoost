import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  UserRegisterForm = new FormGroup(
    {
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{13,}$'),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
      Role: new FormControl('', Validators.required),
      AgreeToAllTerms: new FormControl(false, Validators.requiredTrue),
    },
    { validators: this.passwordMatchValidator }
  );

  registrationError = '';

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }
  activationCode!: { activationCode: string; expirationDate: Date };
  isSubmitted: boolean = false;
  activationCodeInserted: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private RegisterService: AuthService
  ) {}
  confirmUser() {
    this.RegisterService.confirmMail(
      this.UserRegisterForm.controls.email.value!
    ).subscribe({
      next: (respone) => {
        this.isSubmitted = true;
        this.activationCode = respone;
      },
    });
  }
  register() {
    // let date = new Date().getMinutes()
    // let comparedDate = this.activationCode.expirationDate.getMinutes()
    if (this.activationCodeInserted == this.activationCode.activationCode) {
      this.RegisterService.register(
        {
          UserName: this.UserRegisterForm.value['userName']!,
          FirstName: this.UserRegisterForm.value['firstName']!,
          LastName: this.UserRegisterForm.value['lastName']!,
          Password: this.UserRegisterForm.value['password']!,
          Email: this.UserRegisterForm.value['email']!,
        },
        this.UserRegisterForm.value['Role']!
      ).subscribe(
        (response) => {
          alert('Registration successful');
          this.login();
        },
        (error) =>  {
          if (error.status === 400) {
            this.registrationError = "Username already exists. Please choose another one.";
          } else {
            this.registrationError = "Registration failed. Please try again.";
          }
        }
      );
    } else {
      alert('Activation code is incorrect or expired');
    }
  }
  login() {
    this.RegisterService.login({
      userName: this.UserRegisterForm.value['userName']!,
      password: this.UserRegisterForm.value['password']!,
    }).subscribe(
      (response) => {
        this.RegisterService.setToken(response.token);
        this.RegisterService.decodeUserData();
        this.RegisterService.routeConsideringToRole();
      },
      (error) => {
        console.log('Login failed:', error);
      }
    );
  }
  //       console.log("Registration successful:", response);
  //       this.login();
  //       this.router.navigateByUrl(
  //         `/${response["role"]}Form/${response["userId"]}`
  //       );
  //     },
  //     (error) => {
  //       console.error("Registration failed:", error);
  //       if (error.status === 400) {  // Assuming 409 is the status code for conflict (username already exists)
  //         this.registrationError = "Username already exists. Please choose another one.";
  //       } else {
  //         this.registrationError = "Registration failed. Please try again.";
  //       }
  //     }
  //   );
  // }

  // login(){
  //   this.RegisterService
  //     .login({
  //       userName: this.UserRegisterForm.value["userName"]!,
  //       password: this.UserRegisterForm.value["password"]!,
  //     })
  //     .subscribe(
  //       (response) => {
  //         this.RegisterService.setToken(response.token);
  //         this.RegisterService.decodeUserData();
  //       },
  //       (error) => {
  //         console.log('Login failed:', error);
  //       }
  //     );
  // }
}
