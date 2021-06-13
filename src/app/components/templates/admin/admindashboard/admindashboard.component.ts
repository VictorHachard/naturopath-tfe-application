import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertManager} from '../../../../model/my/AlertManager';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent extends AbstractComponents implements OnInit, AfterViewInit {

  userList;
  updateUserForm: FormGroup;
  editUser;
  alertManagerManager: AlertManager;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'username', 'action'];
  dataSource = new MatTableDataSource<any[]>([]);

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.initUser();
  }

  initUser(): void {
    this.userSecurityService.getAllEdit().subscribe(value => {
      this.userList = value;
      this.dataSource = new MatTableDataSource<any>(this.userList);
      this.ngAfterViewInit();
      this.initForm();
    });
  }

  initForm(): void {
    this.updateUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  initUpdateUser(user: any): void {
    this.editUser = user;
    this.updateUserForm = new FormGroup({
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      ROLE_OWNER: new FormControl(user.roleList.includes('ROLE_OWNER'), [Validators.required]),
      ROLE_ADMINISTRATOR: new FormControl(user.roleList.includes('ROLE_ADMINISTRATOR'), [Validators.required]),
      ROLE_MODERATOR: new FormControl(user.roleList.includes('ROLE_MODERATOR'), [Validators.required]),
      ROLE_USER: new FormControl(user.roleList.includes('ROLE_USER'), [Validators.required]),
    });
  }

  updateUser(): void {
    const updateUserValue = this.updateUserForm.value;
    this.userSecurityService.forceUpdate(this.editUser.id, {
      email: updateUserValue.email,
      owner: updateUserValue.ROLE_OWNER,
      administrator: updateUserValue.ROLE_ADMINISTRATOR,
      moderator: updateUserValue.ROLE_MODERATOR,
      user: updateUserValue.ROLE_USER
    }).subscribe(value => {
      this.initUser();
      document.getElementById('updateUserModal').click();
      this.alertManagerManager.addAlert('The user has been updated', 'alert-success');
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
