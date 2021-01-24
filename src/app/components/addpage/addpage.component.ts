import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddpageComponent implements OnInit {

  private id: string;

  category: any;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getEditCategoryDto(this.id).subscribe(data => {
      this.category = data;
      console.log(this.category);
    });
  }

}
