import { ICourseCardTeacherData } from './icourse-card-teacher-data';

export interface ICourseCardDetails {
  id: number;
  name: string | null;
  photoUrl: string | null;
  price: number | null;
  rate: number | null;
  teacher: ICourseCardTeacherData | null;
  description: string | null;
  durtion: number | null;
}
