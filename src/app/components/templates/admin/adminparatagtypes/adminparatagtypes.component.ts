import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-adminparatagtypes',
  templateUrl: './adminparatagtypes.component.html',
  styleUrls: ['./adminparatagtypes.component.css']
})
export class AdminparatagtypesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  paratagtype: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private paratagtypeService: ParatagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.paratagtypeService.getAllParatagType().subscribe(data => {
      for (const paratagtype of data) {
        this.paratagtype.push({id: paratagtype.id, name: paratagtype.name});
      }
      console.log(this.paratagtype);
      this.dataSource = new MatTableDataSource<any>(this.paratagtype);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
