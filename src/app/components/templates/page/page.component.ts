import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../commons/AbstractComponents';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends AbstractComponents implements OnInit {

  private id: string;

  page: any;

  constructor(route: ActivatedRoute,
              router: Router,
              private pageService: PageService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.pageService.getPage(this.id).subscribe(data => {
      this.page = data;
      console.log(this.page);
    });
  }

}
