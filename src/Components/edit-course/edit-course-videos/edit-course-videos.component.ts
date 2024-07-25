import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  SimpleChanges,
} from "@angular/core";
import { InputAngularMaterialComponent } from "../../Inputs/input-angular-material/input-angular-material.component";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { VidService } from "../../../Services/vid.service";
import { CourseServiceService } from "../../../Services/course/course-service.service";

@Component({
  selector: "app-edit-course-videos",
  standalone: true,
  templateUrl: "./edit-course-videos.component.html",
  styleUrl: "./edit-course-videos.component.css",
  imports: [
    InputAngularMaterialComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditCourseVideosComponent implements OnChanges {
  @Input() courseId: number = 0;
  @Input() photoUrl!: string;
  @Input() courseScheduleForm!: FormArray<FormGroup>;
  @Input() coursePhotoForm!: FormControl<File | null>;
  @Output() onUploadPhoto = new EventEmitter<any>();
  @Output() onUploadVideo = new EventEmitter<FormGroup>();
  addedVideosForm = new FormArray<FormGroup>([]);
  videos: any[] = [];
  photoTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];
  videoTypes = [
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/mkv",
    "video/webm",
    "video/flv",
    "video/wmv",
    "video/mpeg",
  ];
  photoExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".webm",
    ".flv",
    ".wmv",
    ".mpeg",
    ".mpg",
  ];
  constructor(
    private videosService: VidService,
    private courseService: CourseServiceService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["courseScheduleForm"].isFirstChange()) {
      this.videosService.getVideosByCourseId(this.courseId).subscribe({
        next: (response) => {
          this.videos = response;
          this.videos.forEach((video) => {
            this.courseScheduleForm.push(
              new FormGroup<any>(
                {
                  id: new FormControl(video["id"]),
                  title: new FormControl(video["title"]),
                  chapter: new FormControl(video["chapter"]),
                  videoUrl: new FormControl(video["videoUrl"]),
                  video: new FormControl<File | null>(null),
                  courseId: new FormControl(video["crsId"]),
                },
                Validators.required
              )
            );
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
      console.log(this.courseScheduleForm);
    }
  }
  getLectureTitleControl(lectureIndex: any): FormControl<any> {
    return this.courseScheduleForm.at(lectureIndex).controls[
      "title"
    ] as FormControl;
  }
  getLectureFileControl(lectureIndex: number): FormControl<any> {
    return this.courseScheduleForm.at(lectureIndex).controls[
      "video"
    ] as FormControl;
  }
  getChapter(lectureIndex: number): FormControl<any> {
    return this.courseScheduleForm.at(lectureIndex).controls[
      "chapter"
    ] as FormControl;
  }
  handleVideo($event: any, lectureIndex: number) {
    const file = $event.target.files[0] as File;
    if (
      this.videoTypes.includes(file.type) ||
      this.videoExtensions.some((ext) => file.name.endsWith(ext))
    ) {
      this.courseScheduleForm.at(lectureIndex).controls["video"].setValue(file);
      this.onUploadVideo.emit(this.courseScheduleForm.at(lectureIndex));
    } else {
      alert("Invalid video file type");
    }
  }
  handlePhotoInput($event: any) {
    const file = $event.target.files[0] as File;
    if (
      this.photoTypes.includes(file.type) ||
      this.photoExtensions.some((ext) => file.name.endsWith(ext))
    ) {
      this.coursePhotoForm.setValue(file);
      this.onUploadPhoto.emit(this.coursePhotoForm);
    } else {
      alert("Invalid photo file type");
    }
  }
  addLecture() {
    this.addedVideosForm.push(
      new FormGroup<any>({
        id: new FormControl(0),
        title: new FormControl("",Validators.required),
        chapter: new FormControl(null,Validators.required),
        video: new FormControl<File | null>(null),
        courseId: new FormControl(this.courseId),
      })
    );
  }
  getAddedVideoTitleControl(addedVideosIndex: number): FormControl<any> {
    return this.addedVideosForm.at(addedVideosIndex).controls[
      "title"
    ] as FormControl;
  }
  getAddedVideoChapter(addedVideosIndex: number): FormControl<any> {
    return this.addedVideosForm.at(addedVideosIndex).controls[
      "chapter"
    ] as FormControl;
  }
  uploadLecture($event:any,lectureIndex: number) {
    console.log(this.addedVideosForm.at(lectureIndex))
    const file = $event.target.files[0] as File;
    if (
      this.videoTypes.includes(file.type) ||
      this.videoExtensions.some((ext) => file.name.endsWith(ext))
    ) {
      this.courseScheduleForm.at(lectureIndex).controls["video"].setValue(file);
      const formData = new FormData()
      formData.append('Title', this.addedVideosForm.at(lectureIndex).controls['title'].value)
      formData.append('Chapter', this.addedVideosForm.at(lectureIndex).controls['chapter'].value)
      formData.append('VideoFile', file)
      this.courseService.addVideo(formData,this.courseId).subscribe({
        next:(response)=>{
          console.log(response)
        },
        error:(error)=>{
          console.log(error)
        }
      })
      } else {
      alert("Invalid video file type");
    }
  }
}
