import { ICourseCardTeacherData } from "./icourse-card-teacher-data";

export interface IcourseEarning {
    id: number;
  name: string | null;
  photoUrl: string | null;
  price: number | null;
  rate: number | null;
  teacher: ICourseCardTeacherData | null;
  description: string | null;
  duration: number | null;
  totalEarnings:number | null;
  totalInstructorEarnings:number | null;
  totalWebsiteEarnings: number | null;
}
