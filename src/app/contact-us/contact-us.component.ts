import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactServiceService } from '../../Services/contact/contact-service.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactServiceService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendEmail(this.contactForm.value).then(
        (response) => {
          console.log(
            'Email sent successfully',
            response.status,
            response.text
          );
          this.snackBar.open('Email sent successfully!', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Failed to send email', error);
          this.snackBar.open('Email sent successfully!.', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
