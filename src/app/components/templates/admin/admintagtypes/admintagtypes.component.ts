import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-admintagtypes',
  templateUrl: './admintagtypes.component.html',
  styleUrls: ['./admintagtypes.component.css']
})
export class AdmintagtypesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  tagType: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagTypeService: TagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.tagTypeService.getAllTagType().subscribe(data => {
      for (const tagType of data) {
        this.tagType.push({id: tagType.id, name: tagType.name});
      }
      this.dataSource = new MatTableDataSource<any>(this.tagType);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
