import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {PageService} from '../../../../service/Page.service';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-adminpages',
  templateUrl: './adminpages.component.html',
  styleUrls: ['./adminpages.component.css']
})

export class AdminpagesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  pages: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'enumState', 'title', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pagesService: PageService) {
    super();
  }

  ngOnInit(): void {
    this.pagesService.getAllEditPage().subscribe(data => {
      for (const page of data) {
        this.pages.push({id: page.id, enumState: page.enumState, title: page.innerPageList[0].title});
      }
      this.dataSource = new MatTableDataSource<any>(this.pages);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
