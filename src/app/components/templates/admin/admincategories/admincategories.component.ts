import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/Category.service';

@Component({
  selector: 'app-admincategories',
  templateUrl: './admincategories.component.html',
  styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent implements OnInit {

  categories: any[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

}
