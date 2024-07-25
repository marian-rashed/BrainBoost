import { ICourseDetailsTeacherData } from "../Teaher/icourse-details-teacher-data";
import { ICourseCardDetails } from "../icourse-card-details";
import { WhatTToLearn } from "../what-tto-learn";
import { IState } from "./istate";

export interface ICourseTaking {
  id: number;
  name?: string;
  description?: string;
  price: number;
  photoUrl?: string;
  longDescription?: string;
  lastUpdate?: Date;
  language?: string;
  duration?: number;
  level?: string;
  rate?: number;
  numOfRates?: number;
  numOfVideos?: number;
  states: IState | null;
  courseCardData: ICourseCardDetails[] | null;
  whatToLearn: WhatTToLearn[] | null;
  teacherDataDto: ICourseDetailsTeacherData | null;
}
