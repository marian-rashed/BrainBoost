import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iadmin } from '../../../models/iadmin';
import { AdminService } from '../../../Services/admin/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-update-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-update-modal.component.html',
  styleUrls: ['./admin-update-modal.component.css']
})
export class AdminUpdateModalComponent {
  @Input() admin!: Iadmin;
  @Output() adminUpdated = new EventEmitter<void>();

  selectedFile!: File;

  constructor(private adminService: AdminService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateAdmin(): void {
    if (this.selectedFile) {
      if (this.admin.id !== null) {
        this.adminService.uploadPhoto(this.selectedFile, this.admin.id).subscribe(
          (photoUrl: string) => {
            console.log('Photo uploaded successfully:', photoUrl);
            this.admin.pictureUrl = photoUrl; // Update the admin's pictureUrl
            this.updateAdminData(); // Update admin data after photo upload
          },
          (error: any) => {
            console.error('Error uploading photo:', error);
          }
        );
      } else {
        console.error('Admin ID is null');
      }
    } else {
      this.updateAdminData();
    }
  }

  private updateAdminData(): void {
    this.adminService.UpdateAdmin(this.admin).subscribe(
      () => {
        this.adminUpdated.emit();
      },
      (error) => {
        console.error('Error updating admin:', error);
      }
    );
  }
}
