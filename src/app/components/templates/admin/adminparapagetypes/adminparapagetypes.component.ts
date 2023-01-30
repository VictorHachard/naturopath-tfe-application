import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {ParapageTypeService} from '../../../../service/parapage-type.service';

@Component({
  selector: 'app-adminparapagetypes',
  templateUrl: './adminparapagetypes.component.html',
  styleUrls: ['./adminparapagetypes.component.css']
})
export class AdminparapagetypesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  parapageType: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private parapageTypeService: ParapageTypeService) {
    super();
  }

  ngOnInit(): void {
    this.parapageTypeService.getAllParapageType().subscribe(data => {
      for (const parapageType of data) {
        this.parapageType.push({id: parapageType.id, name: parapageType.name});
      }
      this.dataSource = new MatTableDataSource<any>(this.parapageType);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
