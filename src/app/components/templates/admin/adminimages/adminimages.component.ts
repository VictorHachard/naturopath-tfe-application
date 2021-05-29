import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ImageService} from '../../../../service/Image.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-adminimages',
  templateUrl: './adminimages.component.html',
  styleUrls: ['./adminimages.component.css']
})
export class AdminimagesComponent extends AbstractComponents implements OnInit, AfterViewInit {

  images: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'enumState', 'name', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private ImagesService: ImageService) {
    super();
  }

  ngOnInit(): void {
    this.ImagesService.getAllEditImageDto().subscribe(data => {
      console.log(this.images);
      for (const image of data) {
        let tmp = 'DRAFT';
        for (const inner of image.innerImageList) {
          if (inner.state === 'VALIDATED') {
            tmp = 'VALIDATED';
            break;
          }
        }
        this.images.push({id: image.id, enumState: tmp, name: image.innerImageList[0].title});
      }
      this.dataSource = new MatTableDataSource<any>(this.images);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
