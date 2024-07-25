import { IReviewSomeDetails } from './ireview-some-details';
import { ICourseDetailsTeacherData } from './Teaher/icourse-details-teacher-data';
import { WhatTToLearn } from './what-tto-learn';

export interface ICourseDetails {
  id: number;
  name: string | null;
  description: string | null;
  price: number;
  photoUrl: string | null;
  longDescription: string | null;
  lastUpdate: Date | null;
  language: string | null;
  durtion: number | null;
  level: string | null;
  rate: number | null;
  numOfRates: number | null;
  numOfVideos: number | null;
  isApproved: boolean;
  teacherDataDto: ICourseDetailsTeacherData | null;
  review: IReviewSomeDetails[] | null;
  whatToLearn: WhatTToLearn[] | null;
}
