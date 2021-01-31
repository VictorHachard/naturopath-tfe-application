import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/view/User';
import {UserSecurityService} from '../../../service/UserSecurity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userSecurityService: UserSecurityService) {
    this.userSecurityService.getUserSecurity().subscribe(value => {
      //console.log(value);
      this.user = value;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
  }

}
