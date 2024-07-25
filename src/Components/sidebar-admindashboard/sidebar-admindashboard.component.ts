import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-admindashboard',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar-admindashboard.component.html',
  styleUrl: './sidebar-admindashboard.component.css'
})
export class SidebarAdmindashboardComponent {

}
