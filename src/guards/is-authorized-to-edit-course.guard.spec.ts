import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAuthorizedToEditCourseGuard } from './is-authorized-to-edit-course.guard';

describe('isAuthorizedToEditCourseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAuthorizedToEditCourseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
