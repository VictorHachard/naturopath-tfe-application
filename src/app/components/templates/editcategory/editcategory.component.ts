import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../../../service/tag.service';
import {VoteService} from '../../../service/vote.service';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  editCategoryForm: FormGroup;

  private id: string;

  category: any;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getEditCategoryDto(this.id).subscribe(data => {
      console.log(data);
      this.category = data;
      this.init();
    });
  }

  init(): void {
    this.editCategoryForm = new FormGroup({
      title: new FormControl(this.category.title,
        [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      description: new FormControl(this.category.description,
        [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  addCategory(): void {}
}
