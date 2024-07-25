import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  goToDashBoard() {
    this.authService.routeConsideringToRole();
  }
  isLogin: boolean = false;
  role: string = '';
  roleId: number = 0;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.userData.subscribe({
      next: () => {
        if (this.authService.userData.getValue() !== null) {
          this.roleId = this.authService.userData.value['roleId'];
          this.isLogin = true;
          switch (
            this.authService.userData.value[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ]
          ) {
            case 'Student':
              this.role = 'Student';
              break;
            case 'Teacher':
              this.role = 'Teacher';
              break;
            case 'Admin':
              this.role = 'Admin';
              break;
            default:
              this.role = '';
              break;
          }
        } else {
          this.isLogin = false;
          this.role = '';
        }
      },
    });
    console.log(this.role);
    console.log(this.isLogin);
  }
  logout() {
    this.authService.logout();
  }
}
