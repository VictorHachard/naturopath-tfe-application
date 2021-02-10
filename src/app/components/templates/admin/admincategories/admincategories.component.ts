import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/Category.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admincategories',
  templateUrl: './admincategories.component.html',
  styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent extends AbstractComponents implements OnInit {

  categories: any[];

  constructor(route: ActivatedRoute,
              router: Router,
              private categoryService: CategoryService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

}
