import { ICourseCardDetails } from './icourse-card-details';

export interface IPaginationCourse {
  totalItems: number;
  totalPages: number;
  courses: ICourseCardDetails[];
}
