import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';
import { CourseServiceService } from '../Services/course/course-service.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class isAuthorizedToEditCourseGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private courseService: CourseServiceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.authService.userData.value != null) {
      return this.courseService.getCourseById(route.params['id']).pipe(
        map((response) => {
          if (response['teacherId'] == parseInt(this.authService.userData.value['roleId'])) {
            return true;
          } else {
            this.router.navigateByUrl('/home');
            return false;
          }
        }),
        catchError((error) => {
          this.router.navigateByUrl('/home');
          return of(false);
        })
      );
    } else {
      this.router.navigateByUrl('/home');
      return of(false);
    }
  }
}
