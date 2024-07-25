import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAdmindashboardComponent } from '../sidebar-admindashboard/sidebar-admindashboard.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout-admindashboard',
  standalone: true,
  imports: [RouterOutlet,SidebarAdmindashboardComponent,FooterComponent],
  templateUrl: './layout-admindashboard.component.html',
  styleUrl: './layout-admindashboard.component.css'
})
export class LayoutAdmindashboardComponent {

}
