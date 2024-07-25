import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category/category.service';
import { ICategory } from '../../models/icategory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatecategory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './updatecategory.component.html',
  styleUrl: './updatecategory.component.css'
})
export class UpdatecategoryComponent {

  categoryName!: string;
  categoryId!: number;
  categories!: ICategory[]

  constructor(private categoryService: CategoryService
    , private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategory();
    });
    this.GetAllCategories()
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (category: ICategory) => {
        this.categoryName = category.name;
      },
      (error) => {
        console.error('Error loading category', error);
      }
    );
  }

  updateCategory(): void {
    const updatedCategory: ICategory = {
      id: this.categoryId,
      name: this.categoryName,
      isDeleted: null,
    };
  
    this.categoryService.updateCategory(updatedCategory).subscribe(
      () => {
        const categoryIndex = this.categories.findIndex(cat => cat.id === this.categoryId);
        if (categoryIndex !== -1) {
          this.categories[categoryIndex] = updatedCategory;
        }
        console.log('Updated successfully');
      },
      (error) => {
        console.error('Error updating category', error);
      }
    );
  }
  

  GetAllCategories() {
    this.categoryService.getAllCategory().subscribe(
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
    this.categoryService.DeleteCategory(categoryId).subscribe(
      () => {
        this.GetAllCategories();
        console.log("deleted successfully");
        
      },
      (error) => {
        console.error(error);
      }
    )
  }
}


