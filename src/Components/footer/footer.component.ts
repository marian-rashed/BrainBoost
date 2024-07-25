import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  isLogin: boolean = false;
  role: string = '';
  roleId: number = 0;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.userData.subscribe({
      next: () => {
        if (this.authService.userData.getValue() !== null) {
          this.role =
            this.authService.userData.value[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
          this.isLogin = true;
          this.roleId = this.authService.userData.value['roleId'];
        }
      },
    });
  }
}
