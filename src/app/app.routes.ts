import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LayoutComponent } from '../Components/layout/layout.component';
import { HomeComponent } from '../Components/home/home.component';
import { CoursesComponent } from '../Components/courses/courses.component';
import { CourseDetailsComponent } from '../Components/course-details/course-details.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { AddCourseComponent } from '../Components/add-course/add-course.component';
import { PricingComponent } from '../Components/pricing/pricing.component';
import { AdminDashboardComponent } from '../Components/admin-dashboard/admin-dashboard.component';
import { CourseContentComponent } from '../Components/Taking-Course/course-content/course-content.component';
import { CertificateComponent } from '../Components/Taking-Course/certificate/certificate.component';
import { VideoComponent } from '../Components/video/video.component';
import { EnrollmentSuccessComponent } from '../Components/EnrollmentSuccess/enrollment-success/enrollment-success.component';
import { EarningComponent } from '../Components/earning/earning/earning.component';
import { InstructorProfileComponent } from '../Components/instructor-profile/instructor-profile.component';
import { NonApprovedCouresesComponent } from '../Components/non-approved-coureses/non-approved-coureses.component';
import { CoursesForAdminComponent } from '../Components/courses-for-admin/courses-for-admin/courses-for-admin.component';
import { VideotakingComponent } from '../Components/Taking-Course/video-taking/videotaking/videotaking.component';
import { TestComponent } from '../Components/test/test.component';
import { TeachersForAdminComponent } from '../Components/teachers-for-admin/teachers-for-admin.component';
import { StudentForAdminComponent } from '../Components/student-for-admin/student-for-admin.component';
import { TeacherEarningDetailsComponent } from '../Components/teacher-earning-details/teacher-earning-details.component';
import { StudentDetailsComponent } from '../Components/student-details/student-details.component';
import { TeacherDetailsComponent } from '../Components/teacher-details/teacher-details.component';
import { AdminComponent } from '../Components/Admin/admin/admin.component';
import { CategoryComponent } from '../Components/category/category.component';
import { ModifiedQuizComponent } from '../Components/modified-quiz/modified-quiz.component';
import { AddAdminComponent } from '../Components/add-admin/add-admin/add-admin.component';
import { UpdatecategoryComponent } from '../Components/updatecategory/updatecategory.component';
import { LayoutAdmindashboardComponent } from '../Components/layout-admindashboard/layout-admindashboard.component';
import { loginInGuard } from '../guards/is-logged-in.guard';
import { isTeacherGuard } from '../guards/is-teacher.guard';
import { EditCourseComponent } from '../Components/edit-course/edit-course.component';
import { EnrollmentFailedComponent } from '../Components/EnrollmentSuccess/enrollment-failed/enrollment-failed.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { isAuthorizedToEditCourseGuard } from '../guards/is-authorized-to-edit-course.guard';
import { IsStudentGuard } from '../guards/is-student.guard';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'EditCourse/:id',
    component: EditCourseComponent,
    canActivate: [isAuthorizedToEditCourseGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [loginInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginInGuard],
  },

  {
    path: 'EnrollmentSuccess/:orderNumber/:courseId',
    component: EnrollmentSuccessComponent,
  },
  {
    path: 'EnrollmentFailed/:orderNumber/:courseId',
    component: EnrollmentFailedComponent,
  },

  // { path: 'TakingVideo', component: VideotakingComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      {
        path: 'courseDetails/:id',
        component: CourseDetailsComponent,
      },
      {path:"aboutTeacher/:id",component:AboutTeacherComponent},
      {
        path: 'StudentDetails/:id',
        component: StudentDetailsComponent,
        canActivate: [IsStudentGuard ],
      },
      {
        path: 'StudentDetails2/:id',
        component: StudentDetailsComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'TeacherDetails/:id',
        component: TeacherDetailsComponent,
        canActivate: [isTeacherGuard],
      },
      {
        path: 'TeacherDetails2/:id',
        component: TeacherDetailsComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'TakingCourse/:id',
        component: CourseContentComponent,
        canActivate: [IsStudentGuard],
      },
      {
        path: 'TakingQuiz/:id',
        component: ModifiedQuizComponent,
        canActivate: [IsStudentGuard],
      },
      {
        path: 'TakingCertificate/:id',
        component: CertificateComponent,
        canActivate: [IsStudentGuard],
      },
      {
        path: 'TakingVideo/:id',
        component: VideoComponent,
        canActivate: [IsStudentGuard],
      },
      {
        path: 'TeacherForm/:id',
        component: InstructorProfileComponent,
        canActivate: [isTeacherGuard],
      },
      { path: 'StudentForm/:id', component: InstructorProfileComponent },
      {
        path: 'addCourse',
        component: AddCourseComponent,
        canActivate: [isTeacherGuard],
      },
    ],
  },
  {
    path: 'layout-dashboard',
    component: LayoutAdmindashboardComponent,
    canActivate: [IsAdminGuard],
    children: [
      {
        path: 'admindashboard',
        component: AdminDashboardComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'nonApprovedCourses',
        component: NonApprovedCouresesComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'earning',
        component: EarningComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'courses-for-admin',
        component: CoursesForAdminComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'teachersforadmin',
        component: TeachersForAdminComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'studentsforadmin',
        component: StudentForAdminComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'TeacherEarningDetails/:id',
        component: TeacherEarningDetailsComponent,
        canActivate: [IsAdminGuard],
      },

      { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard] },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'add-admin',
        component: AddAdminComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'update/:id',
        component: UpdatecategoryComponent,
        canActivate: [IsAdminGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
function getRandom() {
  throw new Error('Function not implemented.');
}
