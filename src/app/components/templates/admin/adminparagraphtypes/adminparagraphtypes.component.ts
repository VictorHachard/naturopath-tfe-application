import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';

@Component({
  selector: 'app-adminparagraphtypes',
  templateUrl: './adminparagraphtypes.component.html',
  styleUrls: ['./adminparagraphtypes.component.css']
})
export class AdminparagraphtypesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  paragraphType: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private paragraphTypeService: ParagraphTypeService) {
    super();
  }

  ngOnInit(): void {
    this.paragraphTypeService.getAllParagraphType().subscribe(data => {
      for (const paragraphType of data) {
        this.paragraphType.push({id: paragraphType.id, name: paragraphType.name});
      }
      this.dataSource = new MatTableDataSource<any>(this.paragraphType);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
