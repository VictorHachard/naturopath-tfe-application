import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../../../service/Category.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admincategories',
  templateUrl: './admincategories.component.html',
  styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  categories: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'parent', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.getAllCategoryInAList().subscribe(data => {
      for (const category of data) {
        this.categories.push({id: category.id, name: category.name, parent: category.parent});
      }
      this.dataSource = new MatTableDataSource<any>(this.categories);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
