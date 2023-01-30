import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../../service/Page.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {TagService} from '../../../../service/Tag.service';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';

@Component({
  selector: 'app-admintags',
  templateUrl: './admintags.component.html',
  styleUrls: ['./admintags.component.css']
})
export class AdmintagsComponent extends AbstractComponents implements OnInit, AfterViewInit {

  tags: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'enumState', 'name', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService) {
    super();
  }

  ngOnInit(): void {
    this.tagService.getAllEditTag().subscribe(data => {
      for (const tag of data) {
        let tmp = 'DRAFT';
        for (const inner of tag.innerTagList) {
          if (inner.state === 'VALIDATED') {
            tmp = 'VALIDATED';
            break;
          }
        }
        this.tags.push({id: tag.id, enumState: tmp, name: tag.innerTagList[0].name});
      }
      this.dataSource = new MatTableDataSource<any>(this.tags);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
