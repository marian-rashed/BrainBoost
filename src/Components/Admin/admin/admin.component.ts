import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin/admin.service';
import { Iadmin } from '../../../models/iadmin';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminUpdateModalComponent } from '../../admin-update-modal/admin-update-modal/admin-update-modal.component';
declare const bootstrap: any;
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,AdminUpdateModalComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit{
  AllAdmins: Iadmin[] = [];
  selectedAdmin: Iadmin = { fname: '', lname: '', pictureUrl: '',isDeleted:false,id:0 }; 

  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.GetAllAdmin();
  }

  GetAllAdmin() {
    this.adminservice.GetAllAdmins().subscribe(
      (data: Iadmin[]) => {
        this.AllAdmins = data;
      },
      (error) => {
        console.error('Error fetching Admins', error);
      }
    );
  }

  openUpdateModal(admin: Iadmin) {
    this.selectedAdmin = { ...admin };
    const updateModal = new bootstrap.Modal(document.getElementById('updateAdminModal'));
    updateModal.show();
    this.GetAllAdmin();
  }

  DeleteAdmin(adminId: number) {
    this.adminservice.DeleteAdmin(adminId).subscribe(
      () => {
        this.GetAllAdmin();
        console.log('deleted successfully');
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
