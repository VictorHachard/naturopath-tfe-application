import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {CategoryService} from '../../../service/Category.service';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../model/view/Page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private id: string;

  page: any;

  constructor(private route: ActivatedRoute, private pageService: PageService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.pageService.getPage(this.id).subscribe(data => {
      this.page = data;
      console.log(this.page);
    });
  }

}
