export interface IGetComment {
  id: number;
  videoId: number;
  content: string;
  studentId: number;
  studentPhoto: string;
  studentName: string;
  commentDate: Date;
}
