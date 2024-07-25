import { ICourseDetailsTeacherData } from '../models/Teaher/icourse-details-teacher-data';
import { ICourseDetails } from '../models/icourse-details';

export class CoureDetails implements ICourseDetails {
  constructor(
    public id: number = 0,
    public price: number = 0,
    public name: string | null = '',
    public description: string | null = '',
    public photoUrl: string | null = '',
    public rate: number | null = 0,
    public fname: string | null = '',
    public lname: string | null = '',
    public review = [],
    public whatToLearn = [],
    public longDescription: string | null,
    public lastUpdate: Date | null,
    public language: string | null,
    public durtion: number | null,
    public level: string | null,
    public numOfRates: number | null,
    public numOfVideos: number | null,
    public isApproved: boolean,
    public teacherDataDto: ICourseDetailsTeacherData | null
  ) {}
}
