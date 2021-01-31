import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  param: string;

  user: any;

  constructor(private route: ActivatedRoute, private userSecurityService: UserSecurityService) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
    this.userSecurityService.getEditDto().subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }
}
