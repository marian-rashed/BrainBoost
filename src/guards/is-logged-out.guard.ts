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
export class logOutGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.userData.value!=null) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
};
