import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class isTeacherGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.authService.userData.value!=null)
    if (this.authService.userData.value['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']=='Teacher') {
      return true;
    }
    this.router.navigate(['/login']);
    return false
  }
};
