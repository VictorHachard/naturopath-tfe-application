import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../service/Category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../../model/view/Category';
import {AbstractComponents} from '../../../commons/AbstractComponents';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent extends AbstractComponents implements OnInit {
  addCategoryForm: FormGroup;
  categories: Category[];

  constructor(route: ActivatedRoute,
              router: Router,
              private categoryService: CategoryService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.categoryService.getAllParentCategoryDto().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
      this.init();
    });
  }

  init(): void {
    this.addCategoryForm = new FormGroup({
      isParent: new FormControl(false),
      category: new FormControl('No category', Validators.required),
      name: new FormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  addCategory(): void {
    const addCategoryValue = this.addCategoryForm.value;
    let categoryId: number;

    if (addCategoryValue.category === 'No category') {
      this.categoryService.addCategory({description: addCategoryValue.description,
        isParent: addCategoryValue.isParent,
        name: addCategoryValue.name}).subscribe(data => {
        this.router.navigate(['/editcategory/' + data.toString()]);
      });
    } else {
      this.categories.forEach(value => {
        if (addCategoryValue.category === value.name) {
          categoryId = value.id;
        }
      });
      this.categoryService.addCategory({description: addCategoryValue.description,
        isParent: addCategoryValue.isParent,
        name: addCategoryValue.name,
        parentCategoryId: categoryId.toString()}).subscribe(data => {
        this.router.navigate(['/editcategory/' + data.toString()]);
      });
    }
  }
}
