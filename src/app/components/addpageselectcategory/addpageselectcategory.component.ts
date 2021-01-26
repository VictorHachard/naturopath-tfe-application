import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/view/Category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from '../../service/page.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addpageselectcategory',
  templateUrl: './addpageselectcategory.component.html',
  styleUrls: ['./addpageselectcategory.component.css']
})
export class AddpageselectcategoryComponent implements OnInit {
  addPageSelectCategoryForm: FormGroup;
  categories: Category[];

  constructor(private router: Router, private categoryService: CategoryService, private pageService: PageService) { }

  ngOnInit(): void {
    this.init();
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  init(): void {
    this.addPageSelectCategoryForm = new FormGroup({
      categories: new FormControl('Tisanes', Validators.required),
      title: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  addPageSelectCategory(): void {
    const addPageSelectCategoryValue = this.addPageSelectCategoryForm.value;

    console.log(addPageSelectCategoryValue);

    let categoryId: number;

    this.categories.forEach(function(value: Category): void {
      if (addPageSelectCategoryValue.categories === value.name) {
        categoryId = value.id;

      }
    });

    this.pageService.createPage({categoryId: categoryId.toString(),
      description: addPageSelectCategoryValue.description,
      title: addPageSelectCategoryValue.title,
      userId: '1'}).subscribe(data => {
        this.router.navigate(['/editpage/' + data.toString()]);
    });
  }
}
