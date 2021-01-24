import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/Category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from '../../service/page.service';

@Component({
  selector: 'app-addpageselectcategory',
  templateUrl: './addpageselectcategory.component.html',
  styleUrls: ['./addpageselectcategory.component.css']
})
export class AddpageselectcategoryComponent implements OnInit {
  addPageSelectCategoryForm: FormGroup;
  categories: Category[];

  constructor(private categoryService: CategoryService, private pageService: PageService) { }

  ngOnInit(): void {
    this.init();
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  init(): void {
    this.addPageSelectCategoryForm = new FormGroup({
      categories: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      description: new FormControl('', [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  addPageSelectCategory(): void {
    const addPageSelectCategoryValue = this.addPageSelectCategoryForm.value;

    console.log(addPageSelectCategoryValue);

    let categoryId: number;

    this.categories.forEach(function(value: Category): void {
      if (addPageSelectCategoryValue.categories[0] === value.name) {
        categoryId = value.id;
      }
    });

    this.pageService.createPage({categoryId: categoryId.toString(),
      description: addPageSelectCategoryValue.description,
      title: addPageSelectCategoryValue.title,
      userId: '1'});
  }
}
