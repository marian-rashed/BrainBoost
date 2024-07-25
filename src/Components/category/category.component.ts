import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category/category.service';
import { ICategory } from '../../models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories:ICategory[]=[]
  categoryName: string = '';

constructor(private categoryservice:CategoryService){}
 ngOnInit(): void {
   this.GetAllCategories()
 }
GetAllCategories()
{
  this.categoryservice.getAllCategory().subscribe(
    (data: ICategory[]) => {
      this.categories = data;
    },
    (error) => {
      console.error(error);
    }
  );
}

DeleteCategory(categoryId:Number)
  {
    this.categoryservice.DeleteCategory(categoryId).subscribe(
      () => {
        this.GetAllCategories();
        console.log("deleted successfully");
        
      },
      (error) => {
        console.error(error);
      }
    )
  }

  addCategory() {
    const newCategory: ICategory = {
      id: null,
      name: this.categoryName,
      isDeleted: null,
    };

    this.categoryservice.addCategory(newCategory).subscribe(
      () => {
        this.GetAllCategories();
        this.categoryName = '';
        console.log("Added successfully");
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
